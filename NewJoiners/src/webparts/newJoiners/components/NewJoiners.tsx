import * as React from 'react';
import type { INewJoinersProps } from './INewJoinersProps';
import { getSP } from '../../pnpjsConfig';
import { INewJoiners } from './INewJoiners';
import { SPFI } from '@pnp/sp';
import { useEffect } from 'react';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';

const NewJoiners  = (props:INewJoinersProps) =>{
  const _sp:SPFI = getSP(props.context);

  const [newJoininersItems,setNewJoinersItems] = React.useState<INewJoiners[]>([])

  const getNewJoinersItems = async () => {

    console.log('context',_sp)
    const items = _sp.web.lists.getById(props.listGuid).items.select().orderBy('SortOrder',true)();

    console.log('QuickTool Items',items)

    setNewJoinersItems((await items).map((item:any) => {
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
      getNewJoinersItems();
    }
  
  },[props])
  

  return (
    <>
    <WebPartTitle displayMode={props.displayMode}
    title={props.title}
    updateProperty={props.updateProperty} />
      <div className="sp-type-column sp-meta-allow-content masdarcity-child masdarcity-commons-padding-wrap masdarcity-grid-with-bg masdarcity-commons-layout-default masdarcity-col masdarcity-col-md masdarcity-col-md-4" style={{visibility: 'visible', overflow: 'hidden', height: 'auto', boxSizing: 'border-box', backgroundSize: 'cover', backgroundPosition: 'center center', minHeight: '504px',width: '100%',border: '1px solid rgb(0, 168, 169)'}}>
        <div>
          <div className="sp-type-panel sp-meta-allow-content masdarcity-panel masdarcity-clearfix masdarcity-dynamic-410 masdarcity-panel-style-panel" style={{boxSizing: 'border-box', maxHeight: '480px', height: '480px'}}>
            <p className="masdarcity-panel-title masdarcity-clearfix" style={{backgroundColor: 'rgb(0, 168, 169)',border: '1px solid rgb(0, 168, 169)'}}>
                <div className="masdarcity-panel-title-wrap">
                    <span className="masdarcity-panel-title-text" style={{fontSize: '20px', color: 'white'}}>New Joiners</span>
                </div>
            </p>
            <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: '458.667px'}}>
              <div className="masdarcity-panel-content masdarcity-panel-slim-scroll" style={{overflow: 'hidden', width: 'auto', height: '458.667px'}}>
                    {props.listGuid ? newJoininersItems.map((o:INewJoiners,index:number) => {
                      return (
                        <div className="sp-type-images-list sp-meta-allow-content sp-meta-parent masdarcity-list2 masdarcity-dynamic-415">
                          <div className="masdarcity-listitem-wrap">
                              <div className="masdarcity-listitem-column" style={{fontSize: '1em', width: '52px'}}>
                                  <div className="masdarcity-listitem-img-wrap" style={{width: '52px', height: '52px', borderRadius: '100%'}}>
                                      <div className="masdarcity-listitem-img" style={{width: '52px', height: '52px', backgroundImage: 'url(https://neweralive.na/wp-content/uploads/2024/06/lloyd-sikeba.jpg)'}}></div>
                                  </div>
                              </div>
                              <div className="masdarcity-listitem-content">
                                  <div className="masdarcity-listitem-title" style={{color: 'rgb(49, 97, 209)'}}>Thomas Brown</div>
                                  <div className="masdarcity-listitem-subtitle" style={{color: 'rgb(49, 97, 209)'}}>Praesent laoreet blandit est</div>
                                  <div className="masdarcity-listitem-description">Click for view more...</div>
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
              <div className="slimScrollBar" style={{background: 'rgb(0, 0, 0)', width: '7px', position: 'absolute', top: '0px', opacity: '0.4', display: 'none', borderRadius: '7px', zIndex: '99', right: '1px', height: '297.257px'}}></div>
              <div className="slimScrollRail" style={{width: '7px', height: '100%', position: 'absolute', top: '0px', display: 'none', borderRadius: '7px', background: 'rgb(51, 51, 51)', opacity: '0.2', zIndex: '90', right: '1px'}}></div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default NewJoiners