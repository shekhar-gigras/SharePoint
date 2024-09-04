import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';

import * as strings from 'AssetsCustomizerApplicationCustomizerStrings';
import {SPComponentLoader} from '@microsoft/sp-loader';

const LOG_SOURCE: string = 'AssetsCustomizerApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAssetsCustomizerApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AssetsCustomizerApplicationCustomizer
  extends BaseApplicationCustomizer<IAssetsCustomizerApplicationCustomizerProperties> {

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    
    const url = 'https://techozeano0.sharepoint.com/';
    SPComponentLoader.loadCss(url+'SiteAssets/css/masdar-common.css');
    SPComponentLoader.loadCss(url+'SiteAssets/css/masdar-sharepoint.css');
    SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css');
    SPComponentLoader.loadCss('https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css');
    SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/css/simple-line-icons.min.css');



    SPComponentLoader.loadScript(url+'SiteAssets/js/lib/jquery.min.js').then((): Promise<{}> => { return SPComponentLoader.loadScript(url+'SiteAssets/js/lib/jquery.min.js');})
    .catch((reason: string) => {
      console.error('error')
    }); 
    SPComponentLoader.loadScript(url+'SiteAssets/js/lib/acmeticker.min.js').then((): Promise<{}> => { return SPComponentLoader.loadScript(url+'SiteAssets/js/lib/acmeticker.min.js');})
    .catch((reason: string) => {
      console.error('error')
    });
    SPComponentLoader.loadScript(url+'SiteAssets/js/masdar-common.js').then((): Promise<{}> => { return SPComponentLoader.loadScript(url+'SiteAssets/js/masdar-common.js');})
    .catch((reason: string) => {
      console.error('error')
    }); 

    return Promise.resolve();
  }
}
