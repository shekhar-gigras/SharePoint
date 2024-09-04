import * as React from 'react';
import type { IQuickToolsProps } from './IQuickToolsProps';
import { getSP } from '../../pnpjsConfig';
import { IQuickTool } from './IQuickTool';
import { SPFI } from '@pnp/sp';
import { useEffect } from 'react';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';


const QuickTools = (props:IQuickToolsProps) =>{

  const _sp:SPFI = getSP(props.context);

  const [quickDownloadItems,setQuickToolItems] = React.useState<IQuickTool[]>([])

  const getQuickToolItems = async () => {

    console.log('context',_sp)
    const items = _sp.web.lists.getById(props.listGuid).items.select().orderBy('SortOrder',true)();

    console.log('QuickTool Items',items)

    setQuickToolItems((await items).map((item:any) => {
      return {
        Id: item.Id,
        ToolName: item.Title,
        ToolLink: item.Link,
        ToolIcon: item.IconCssClass,
        SortOrder:item.SortOrder,
        BackgroundColor:item.BackgroundColor
      }
    }));

  }

  useEffect(() => {

    console.log('props',props)

    if(props.listGuid && props.listGuid !== '') {
        getQuickToolItems();
    }
  
  },[props])
  

  return (
    <>
    <WebPartTitle displayMode={props.displayMode}
    title={props.title}
    updateProperty={props.updateProperty} />
    <div className="sp-type-tiles sp-meta-allow-content sp-meta-parent masdarcity-tiles-zero-spacing masdarcity-tiles masdarcity-dynamic-266 masdarcity-resize">
    {props.listGuid ? quickDownloadItems.map((o:IQuickTool,index:number) => {
      const className:string = 'masdarcity-icon masdarcity-dynamic-556 masdarcity-icon-normal i-masdarcity-icon-normal ' + o.ToolIcon;

      return (
          <div className="sp-type-tile sp-meta-allow-content masdarcity-child masdarcity-dynamic-268 masdarcity-tile-style-default masdarcity-tile" style={{width: 'calc(45% - 5px)', height: '160px',marginLeft:'0px',marginTop:'5px',marginRight: '5px'}}>
              <div className="masdarcity-tile-bg" style={{lineHeight: '160p;'}}>
                  <div className="masdarcity-tile-bg-color" style={{opacity: '1', backgroundColor: 'rgb(57, 173, 199)'}}></div>
                  <i className={className} style={{fontSize: '96px'}}></i>
              </div>
              <div className="masdarcity-tile-content masdarcity-resize-keep-transition" style={{fontSize: '100%', top: '116px'}}>
                  <div className="masdarcity-tile-title">
                      <div className="masdarcity-tile-title-inner">{o.ToolName}</div>
                  </div>
                  <div className="masdarcity-tile-description-wrap masdarcity-tile-descr-empty" style={{height: '116px'}}>
                      <div className="masdarcity-tile-description"></div>
                  </div>
              </div>
          </div>
      )
    }):<Placeholder iconName='Edit'
    iconText='Configure your web part'
    description='Please configure the web part.'
    buttonLabel='Configure'
    onConfigure={() => props.context.propertyPane.open()}
    />}  
      </div>
    </>
  )
}

export default QuickTools
