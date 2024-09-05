import * as React from 'react';
import styles from './PlayWithCarousel.module.scss';
import { IPlayWithCarouselProps } from './IPlayWithCarouselProps';
import { Carousel, CarouselButtonsLocation, CarouselButtonsDisplay, ICarouselImageProps } from "@pnp/spfx-controls-react/lib/Carousel";
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';

export default class PlayWithCarousel extends React.Component<IPlayWithCarouselProps, {}> {

  public render(): React.ReactElement<IPlayWithCarouselProps> {
    const {
      hasTeamsContext,
      elements,
      displayMode,
      title,
      updateProperty,
      listGuid,
      context,
      description,
      linkname,
      Link

    } = this.props;


    const carouselElements: ICarouselImageProps[] = elements.map(i => {return {
        imageSrc: i.imageSrc,
        title: i.title,
        description: i.description,
        url: i.url,
        showDetailsOnHover: true,
        imageFit: ImageFit.cover      
      };
    });

    return (
      <>
      <WebPartTitle displayMode={displayMode}
      title="Carousel Web Part"
      updateProperty={updateProperty} />
      {listGuid ?
      <div  className="sp-type-row sp-meta-allow-content sp-meta-parent masdarcity-child masdarcity-row masdarcity-resize masdarcity-grid-no-bg">
        <div className="sp-type-column sp-meta-allow-content masdarcity-child masdarcity-col-separator-none masdarcity-commons-padding-wrap masdarcity-grid-with-bg masdarcity-commons-no-margin-mobile masdarcity-commons-no-padding-mobile masdarcity-col masdarcity-col-md masdarcity-col-md-8" style={{visibility: 'visible', overflow: 'hidden', height: 'auto', boxSizing: 'border-box',verticalAlign: 'middle',backgroundPosition: 'center center',backgroundSize: 'cover',WebkitBoxSizing: 'border-box'}}>
          <div className="sp-type-slideshow sp-meta-allow-content slick-cloned masdarcity-child masdarcity-slideshow masdarcity-dynamic-227 masdarcity-slideshow-style-title-first masdarcity-slideshow-align-center" style={{width: '728px', fontSize: '100%', minHeight: '400px'}}>
            <section className={`${styles.playWithCarousel} ${hasTeamsContext ? styles.teams : ''}`}>
              <div>
                <Carousel
                  buttonsLocation={CarouselButtonsLocation.top}
                  buttonsDisplay={CarouselButtonsDisplay.hidden}
                  contentContainerStyles={styles.carouselContent}
                  containerButtonsStyles={styles.carouselButtonsContainer}
                  isInfinite={true}
                  element={carouselElements}
                  pauseOnHover={true}
                  interval={4000}
                  onMoveNextClicked={this._onCarouselMoveNextClicked}
                  onMovePrevClicked={this._onCarouselMovePrevClicked}
                  onSelect={this._onCarouselSelect}
                />
              </div>
            </section>
          </div>
        </div>
        <div className="sp-type-column sp-meta-allow-content masdarcity-child masdarcity-col-separator-none masdarcity-commons-padding-wrap masdarcity-grid-with-bg masdarcity-commons-no-margin-mobile masdarcity-commons-no-padding-mobile masdarcity-commons-layout-full-height masdarcity-align-center masdarcity-row-valign-middle masdarcity-col masdarcity-col-md masdarcity-col-md-4" style={{visibility: 'visible', overflow: 'hidden', minHeight: 'calc(400px)',textAlign: 'center',boxSizing: 'border-box',backgroundColor: 'rgb(0, 168, 169)', backgroundSize: 'cover', backgroundPosition: 'center center'}}>
            <div className="carosel-right-text1">
                <div className='carosel-right-text2'>
                    <span className='carosel-right-text3'>{title}</span>
                    <span className='carosel-right-text4'><br/><br/></span>
                    <span className='carosel-right-text5'><em>
                    {description}
                    </em></span>
                    <div>
                    <em><span className='carosel-right-text6'><br/></span></em>
                    <div>
                        <span className='carosel-right-text7'>
                          <a className="carosel-right-text8 sp-type-button masdarcity-btn masdarcity-btn-white masdarcity-btn-simple" href={Link}>{linkname}</a>
                        </span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      :<Placeholder iconName='Edit'
      iconText='Configure your Carousel'
      description='Please configure Carousel.'
      buttonLabel='Configure'
      onConfigure={() => context.propertyPane.open()}
      />}
      </>
    );
  }
  private _onCarouselMoveNextClicked = (index: number): void => {
    console.log(`Next button clicked: ${index}`);
  }

  private _onCarouselMovePrevClicked = (index: number): void => {
    console.log(`Prev button clicked: ${index}`);
  }

  private _onCarouselSelect = (selectedIndex: number): void => {
    console.log(`Item selected: ${selectedIndex}`);
  }
}
