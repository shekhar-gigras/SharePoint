import * as React from 'react';
import type { IHomeCarouselProps } from './IHomeCarouselProps';
import { getSP } from '../../pnpjsConfig';
import { ICarousel } from './ICarousel';
import { SPFI } from '@pnp/sp';
import { useEffect } from 'react';

const HomeCarousel = (props:IHomeCarouselProps) =>{

  let _sp:SPFI = getSP(props.context);

  const [,setCarouselItems] = React.useState<ICarousel[]>([])

  const getCarouselItems = async () => {

    console.log('context',_sp)
    const items = _sp.web.lists.getById(props.listGuid).items.select().orderBy('Letter',true).orderBy('Title',true)();

    console.log('Carousel Items',items)

    setCarouselItems((await items).map((item:any) => {
      return {
        Id: item.Id,
        Title: item.Title,
        Body: item.Body,
        Letter: item.Letter
      }
    }));

  }

  useEffect(() => {

    console.log('props',props)

    if(props.listGuid && props.listGuid != '') {
        getCarouselItems();
    }
  
  },[props])
  

  return (
    <div  className="sp-type-row sp-meta-allow-content sp-meta-parent masdarcity-child masdarcity-row masdarcity-resize masdarcity-grid-no-bg">
        <div className="sp-type-column sp-meta-allow-content masdarcity-child masdarcity-col-separator-none masdarcity-commons-padding-wrap masdarcity-grid-with-bg masdarcity-commons-no-margin-mobile masdarcity-commons-no-padding-mobile masdarcity-col masdarcity-col-md masdarcity-col-md-8" style={{visibility: 'visible', overflow: 'hidden', height: 'auto', boxSizing: 'border-box',verticalAlign: 'middle',backgroundPosition: 'center center',backgroundSize: 'cover',WebkitBoxSizing: 'border-box'}}>
          <div className="sp-type-slideshow sp-meta-allow-content slick-cloned masdarcity-child masdarcity-slideshow masdarcity-dynamic-227 masdarcity-slideshow-style-title-first masdarcity-slideshow-align-center" style={{width: '728px', fontSize: '100%', minHeight: '400px'}}>
              <div className="masdarcity-slideshow-bg">
                <img src="https://masdarcity.ae/images/default-source/default-album/lady-walking-tilt-correctedfc2aac10085240b38c98850d72828ad9.jpg?sfvrsn=eab4b5fb_3" style={{width: '728px', height: '485.333px', marginLeft: '0px', marginTop: '-42.6667px'}} alt="Home carosel"/>
                <div className="masdarcity-slideshow-bg-color" style={{opacity: '0.6', backgroundColor: 'rgb(0, 0, 0)'}}/>
              </div>
              <div className="masdarcity-slideshow-content" style={{color: 'rgb(255, 255, 255)', top: '129.5px'}}>
                  <div className="masdarcity-slideshow-title">
                      <div className="masdarcity-slideshow-title-inner">Documents Database</div>
                  </div>
                  <div className="masdarcity-slideshow-description-wrap">
                      <div className="masdarcity-slideshow-description">1246 new documents</div>
                  </div>
                  <a className="masdarcity-slideshow-link masdarcity-dynamic-231 masdarcity-btn-white masdarcity-dynamic-232 masdarcity-brand-white-color masdarcity-btn-link" href="masdarcity.com" target="_blank">View More</a>
              </div>
          </div>
        </div>
        <div className="sp-type-column sp-meta-allow-content masdarcity-child masdarcity-col-separator-none masdarcity-commons-padding-wrap masdarcity-grid-with-bg masdarcity-commons-no-margin-mobile masdarcity-commons-no-padding-mobile masdarcity-commons-layout-full-height masdarcity-align-center masdarcity-row-valign-middle masdarcity-col masdarcity-col-md masdarcity-col-md-4" style={{visibility: 'visible', overflow: 'hidden', minHeight: 'calc(400px)',textAlign: 'center',boxSizing: 'border-box',backgroundColor: 'rgb(0, 168, 169)', backgroundSize: 'cover', backgroundPosition: 'center center'}}>
            <div className="carosel-right-text1">
                <div className='carosel-right-text2'>
                    <span className='carosel-right-text3'>Mauris mollis</span>
                    <span className='carosel-right-text4'><br/><br/></span>
                    <span className='carosel-right-text5'><em>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum semper feugiat. Mauris posuere enim magna, sit amet sagittis arcu convallis vitae.
                    </em></span>
                    <div>
                    <em><span className='carosel-right-text6'><br/></span></em>
                    <div>
                        <span className='carosel-right-text7'>
                          <a className="carosel-right-text8 sp-type-button masdarcity-btn masdarcity-btn-white masdarcity-btn-simple" href='https://masdarcity.ae'>Read More</a>
                        </span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeCarousel
