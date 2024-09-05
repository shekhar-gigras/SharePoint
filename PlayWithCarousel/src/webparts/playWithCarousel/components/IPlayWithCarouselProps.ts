import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IPlayWithCarouselProps {
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

export interface ICarouselElement {
  imageSrc: string;
  title: string;
  description: string;
  url: string;
}