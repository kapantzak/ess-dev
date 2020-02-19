//  Control specific scripts - Async helper
//  Date: {{form.date}}
//  Control name: '{{form.name}}.ascx'

import * as asyncHelper from "../asyncHelpers/generalAsyncHelper";
import { encodeAndStringify } from "../helpers/htmlHelper";
{{#if answers.stateHelper}}
import models = eStudio.classes.HttpRequestsDataModels.{{form.className}};
{{/if}}

export class {{asyncHelper.className}} extends asyncHelper.AsyncHelper {
  constructor(url?: string) {
    let thisUrl = url ? url : "Async/{{asyncHandler.front.name}}";
    super(thisUrl);
  }

}
