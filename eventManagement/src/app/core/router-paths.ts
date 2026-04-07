import { QUERY_PARAMS } from "./query-prams";

export class RouterPath {
  static Pages = new (class {
    HOME = 'home';
    EVENTS_MANAGEMENT = 'events';
    EVENTS_DETAILS = `event-details/:${QUERY_PARAMS.ID}`;
    DETAILS = (id: number): string => `/${this.EVENTS_DETAILS.replace(`:${QUERY_PARAMS.ID}`, id.toString())}`; 
    LOGIN = 'login';
    ADD_EVENT = 'add-event';
  })();
}
