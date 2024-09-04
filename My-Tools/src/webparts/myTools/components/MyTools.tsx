import * as React from 'react';
import type { IMyToolsProps } from './IMyToolsProps';
import { getSP } from '../../pnpjsConfig';
import { IMyTools } from './IMyTools';
import { SPFI } from '@pnp/sp';
import { useEffect } from 'react';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';

    const MyTools = (props:IMyToolsProps) =>{
    
    let _sp:SPFI = getSP(props.context);

    const [MyItems,setMyToolsItems] = React.useState<IMyTools[]>([])

  const getMyToolsItems = async () => {


    console.log('context',_sp)
    const items = _sp.web.lists.getById(props.listGuid).items.select().orderBy('SortOrder',true)();

    console.log('Quick Launch Items',items)

    setMyToolsItems((await items).map((item:any) => {
      return {
        Id: item.Id,
        ToolName: item.Title,
        ToolLink: item.Link,
        ToolIcon: item.IconCssClass,
        SortOrder:item.SortOrder
      }
    }));

  }

  useEffect(() => {

    console.log('props',props)

    if(props.listGuid && props.listGuid !== '') {
        getMyToolsItems();
    }
  
  },[props])
  

  return (
    <>
    <WebPartTitle displayMode={props.displayMode}
    title={props.title}
    updateProperty={props.updateProperty} />
    <div className="sp-type-panel sp-meta-allow-content masdarcity-panel masdarcity-clearfix masdarcity-dynamic-541 masdarcity-panel-link-top masdarcity-panel-style-solid-header div-quick-launch">
        <p className="masdarcity-panel-title masdarcity-clearfix masdarcity-panel-title-with-icon p-quick-launch">
            <div className="masdarcity-panel-title-wrap">
                <span className="masdarcity-panel-title-text span-panel-text">
                    <i className="masdarcity-icon masdarcity-dynamic-549 masdarcity-icon-fa-wrench masdarcity-icon-normal"/>My Tools
                </span>
            </div>
            <a className="masdarcity-panel-link masdarcity-btn masdarcity-btn-xs masdarcity-dynamic-544 masdarcity-btn-white masdarcity-dynamic-545 masdarcity-btn-simple" href="https://www.masdarcity.com/">More</a>
        </p>
        <div className="masdarcity-panel-content">
            <div className="sp-type-tiles sp-meta-allow-content sp-meta-parent masdarcity-tiles-zero-spacing masdarcity-tiles-small masdarcity-tiles masdarcity-dynamic-552 masdarcity-resize">

    {props.listGuid ? MyItems.map((o:IMyTools,index:number) => {
        let className:string = 'masdarcity-icon masdarcity-dynamic-556 masdarcity-icon-normal i-masdarcity-icon-normal ' + o.ToolIcon;
        return (<div className="sp-type-tile sp-meta-allow-content masdarcity-child masdarcity-dynamic-554 masdarcity-tile-style-default masdarcity-tile div-sp-type-tile">
                    <div className="masdarcity-tile-bg div-masdarcity-tile-bg">
                        <div className="masdarcity-tile-bg-color div-masdarcity-tile-bg-color"/>
                        <i className={className}/>
                    </div>
                    <div className="masdarcity-tile-content masdarcity-resize-keep-transition div-masdarcity-resize-keep-transition">
                        <div className="masdarcity-tile-title">
                        <a href={o.ToolLink} style={{color:'#ffffff',textDecoration: 'none'}}>
                            <div className="masdarcity-tile-title-inner">{o.ToolName}</div>
                            </a>
                        </div>
                        <div className="masdarcity-tile-description-wrap masdarcity-tile-descr-empty div-masdarcity-tile-description-wrap">
                            <div className="masdarcity-tile-description"/>
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
        </div>
    </div>
    </>
  )
}

export default MyTools
