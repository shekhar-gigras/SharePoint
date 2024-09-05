import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ICarouselElement } from "./ICarouselElement";
export interface IHomeCarouselProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  elements: ICarouselElement[];
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  context: WebPartContext;
  listGuid: string;
  linkname:string;
  Link:string;
}
