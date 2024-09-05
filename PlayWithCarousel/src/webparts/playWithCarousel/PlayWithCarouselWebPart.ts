import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'PlayWithCarouselWebPartStrings';
import PlayWithCarousel from './components/PlayWithCarousel';
import { IPlayWithCarouselProps, ICarouselElement } from './components/IPlayWithCarouselProps';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { getSP } from '../pnpjsConfig';
import { SPFI } from '@pnp/sp';


export interface IPlayWithCarouselWebPartProps {
  description: string;
  title: string;
  list: string;
  linkname:string;
  link:string;
}

export default class PlayWithCarouselWebPart extends BaseClientSideWebPart<IPlayWithCarouselWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  protected onInit(): Promise<void> {
      this._environmentMessage = this._getEnvironmentMessage();

      return super.onInit();
    }
  public async render(): Promise<void> {
    let carouselElements : ICarouselElement[] = [
      {
        imageSrc: 'https://masdarcity.ae/images/default-source/default-album/social-sustainability58d62c6b-4cce-4715-a63f-34d765ff3297.jpg?sfvrsn=d3b7be16_3',
        title: 'social sustainability',
        description: 'The ability of a community, organization, or people group to continue to thrive.',
        url: 'https://masdarcity.ae/sustainable-urban-development/Sustainability-at-masdar-city',
      },
      {
        imageSrc: 'https://masdarcity.ae/images/default-source/default-album/lady-walking-tilt-correctedfc2aac10085240b38c98850d72828ad9.jpg?sfvrsn=eab4b5fb_3',
        title: 'economic sustainability',
        description: 'The ability to sustain economic operations so that people and businesses can continue to prosper. ',
        url: 'https://masdarcity.ae/sustainable-urban-development/Sustainability-at-masdar-city',
      },     
    ];
    let _sp:SPFI = getSP(this.context);
    if(this.properties.list && this.properties.list !== '') {
      console.log('context',_sp)
      const items = _sp.web.lists.getById(this.properties.list).items.select().orderBy('SortOrder',true)();

      console.log('Carousel Items',items)
      carouselElements = (await items).map((item:any) => {
        return {
          imageSrc: JSON.parse(item.Image).serverRelativeUrl,
          title: item.Title,
          description: item.Description,
          url: item.Url.Url //item.SortOrder
        }
      });       
    }

    const element: React.ReactElement<IPlayWithCarouselProps> = React.createElement(
      PlayWithCarousel,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        elements: carouselElements,
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
        context: this.context,
        listGuid: this.properties.list,
        linkname: this.properties.linkname,
        Link: this.properties.link,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }


  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Carousel Properties"
          },
          groups: [
            {
              groupName: "Right Panel",
              groupFields: [
                PropertyPaneTextField('title', {
                  label: "Titel"
                }),
                PropertyPaneTextField('description', {
                  label: "Description"
                }),
                PropertyPaneTextField('linkname', {
                  label: "Link Name"
                }),
                PropertyPaneTextField('link', {
                  label: "Link"
                }),
              ]
            },
            {
              groupName: "Left Panel",
              groupFields: [
                PropertyFieldListPicker('list', {
                  label: 'Select a Carousel list',
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null as any,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
