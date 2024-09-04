import * as React from 'react';
import type { IAnnouncementTickerProps } from './IAnnouncementTickerProps';
import { SPFI } from '@pnp/sp';
import { getSP } from '../../pnpjsConfig';
import { IAnnouncementTicker } from './IAnnouncementTicker';
import { useEffect } from 'react';
import Ticker from 'react-ticker';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';

const AnnouncementTicker = (props:IAnnouncementTickerProps) =>{

  let _sp:SPFI = getSP(props.context);
  const [,setAnnouncementTickerItems] = React.useState<IAnnouncementTicker[]>([]);


  const getAnnouncementTickerItems = async () => {
    console.log('Announcement Ticker Context',_sp);
    const items = _sp.web.lists.getById(props.listGuid).items.select().orderBy('SortOrder',true)();

    console.log('Announcement Ticker Items',items);
    setAnnouncementTickerItems((await items).map((item:any) => {
      return {
        Id: item.Id,
        Title: item.Title,
        SortOrder: item.SortOrder
      }
    }));
  }

  useEffect(() => {
    console.log('Announcement Ticker props',props)
    if(props.listGuid && props.listGuid != '') {
      getAnnouncementTickerItems();
    } 
  },[props])

  return ( 
    <>
    <WebPartTitle displayMode={props.displayMode}
    title={props.title}
    updateProperty={props.updateProperty} /> 
    {props.listGuid ?
    <div className="sp-type-tickers sp-meta-allow-content sp-meta-parent masdarcity-tickers masdarcity-tickers-style-solid masdarcity-tickers-size-medium masdarcity-resize staff-notice1 ticker-wrapper">
    <div className="masdarcity-tickers-title staff-notice2">
        Breaking News
        <div className="masdarcity-tickers-tick staff-notice3"></div>
    </div>
    <div className="masdarcity-tickers-content staff-notice4 ticker-transition masdar-home-announcement-ticker">
          <Ticker offset="run-in" speed={10} mode="await">
          {()=>
          <>
            <div>Aenean non quam bibendum, congue magna varius, aliquam nisi. Etiam sed dui bibendum, lacinia nisl sit amet, fringilla nisl.</div>
            <div>Ut interdum leo vel viverra tincidunt. Donec vitae nulla efficitur lectus dignissim maximus in quis ipsum.</div>
            <div>Mauris mollis cursus arcu id consectetur. Aenean mi ipsum, blandit ut gravida quis, aliquam quis mi.</div>
          </>
          }
          </Ticker>
        </div>
      </div>
      :<Placeholder iconName='Edit'
      iconText='Configure your web part'
      description='Please configure the web part.'
      buttonLabel='Configure'
      onConfigure={() => props.context.propertyPane.open()}
      />}
    </>
  )
}

export default AnnouncementTicker