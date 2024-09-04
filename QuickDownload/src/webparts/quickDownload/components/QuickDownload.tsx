import * as React from 'react';
import type { IQuickDownloadProps } from './IQuickDownloadProps';
import { getSP } from '../../pnpjsConfig';
import { SPFI } from '@pnp/sp';
import { IQuickDownload } from './IQuickDownload';
import { useEffect } from 'react';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';

const QuickDownload = (props:IQuickDownloadProps) =>{
  let _sp:SPFI = getSP(props.context);
  const [quickDownloadItems,setQuickDownloadItems] = React.useState<IQuickDownload[]>([])

  const getQuickDownloadItems = async () => {
    const items = _sp.web.lists.getById(props.listGuid).items.select()();

    console.log('Quick Download Items',items)

    setQuickDownloadItems((await items).map((item:any) => {
        return {
            Id: item.Id,
            Title: item.Title,
            DocumentLink: item.DocumentLink,
            CssIcon: item.CssIcon
          }
      }));

  }

  useEffect(() => {
    if(props.listGuid && props.listGuid != '') {
      getQuickDownloadItems();
    }
  
  },[props])

  return (
    <>
    <WebPartTitle displayMode={props.displayMode}
    title={props.title}
    updateProperty={props.updateProperty} />
      <div className="sp-type-panel sp-meta-allow-content masdarcity-panel masdarcity-clearfix masdarcity-dynamic-575 masdarcity-panel-style-solid-header div-quick-download-masdarcity-panel-style-solid-header">
          <p className="masdarcity-panel-title masdarcity-clearfix masdarcity-panel-title-with-icon div-quick-download">
              <div className="masdarcity-panel-title-wrap">
                  <span className="masdarcity-panel-title-text div-quick-download-title">
                      <i className="masdarcity-icon masdarcity-dynamic-580 masdarcity-icon-ion-android-document masdarcity-icon-normal"/>Quick Downloads
                  </span>
              </div>
          </p>
          <div className="masdarcity-panel-content">
              <div>
              {props.listGuid ? quickDownloadItems.map((o:IQuickDownload,index:number) => {
                let className:string = 'masdarcity-icon masdarcity-dynamic-585 masdarcity-icon-normal div-quick-download-masdarcity-icon ' + o.CssIcon;
                return (<div className="sp-type-file-list-item sp-meta-allow-content masdarcity-child masdarcity-listitem masdarcity-dynamic-584 div-quick-download-sp-type-file-list-item">
                      <div className="masdarcity-listitem-wrap">
                          <div className="masdarcity-listitem-column div-quick-download-masdarcity-listitem-column">
                              <i className={className}/>
                          </div>
                          <div className="masdarcity-listitem-content">
                              <a href={o.DocumentLink} style={{color:'#ffffff',textDecoration: 'none'}}>
                                <div className="masdarcity-listitem-title div-quick-download-masdarcity-listitem-title">{o.Title}</div>
                              </a>
                          </div>
                      </div>
                  </div>)
                }):<Placeholder iconName='Edit'
                iconText='Configure your web part'
                description='Please configure the web part.'
                buttonLabel='Configure'
                onConfigure={() => props.context.propertyPane.open()}
                />}  
              </div>
              <div>
                  <br></br>
              </div>
              <div>
                  <a className="sp-type-button masdarcity-btn masdarcity-dynamic-603 masdarcity-btn-white masdarcity-dynamic-604 masdarcity-btn-simple" href="https://www.masdarcity.ae">View More</a>  <br/>
              </div>
          </div>
      </div>
      </>
  )
}
export default QuickDownload