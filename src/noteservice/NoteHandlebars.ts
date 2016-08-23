'use strict';

/* Handlebars Helper */

/* Rate transformiert den Score (Ausprägung des Ratings) in HTML
 Der gültige Wertebereich beträgt 0 bis BESTRATING.
 Wird ein ungüliger Wert übergeben, wird die class error-sign generiert*/

Handlebars.registerHelper('rate', function (rating:number) {
    let RatingHTML:string = "";
    const BESTRATING:number = 5;
    if (rating >= 0 && rating <= BESTRATING) {
        for (let i = 1; i <= BESTRATING; i++) {
            if (rating >= i) {
                RatingHTML = RatingHTML + '<span class="scored-sign">&nbsp;</span>';
            } else {
                RatingHTML = RatingHTML + '<span class="unscored-sign">&nbsp;</span>';
            }
        }
    }
    else {
        const ERRORSIGNSPAN:string = '<span class="error-sign">&nbsp;</span>';
        for (let i = 1; i <= BESTRATING; i++) {
            RatingHTML = RatingHTML + ERRORSIGNSPAN;
        }
    }

    return new Handlebars.SafeString(RatingHTML);
});
/* Showdate zeigt ein Datum der Note mit einem Präfix an
 *  Mit dem Präfix (optional) kann eine Beschreibung des Datums mitgegeben werden*/

Handlebars.registerHelper('showdate', function (date:string, prefixText:string) {
    const DATEFORMAT:string = "LL";
    let outDate:string = "";
    if (!(typeof(prefixText) === "string")) {
        prefixText = "";
    }
    if (moment(date).isValid()) {
        outDate = prefixText + " " + moment(date).format(DATEFORMAT);
    }
    else {
        outDate = "";
        console.log("Invalid Date: " + moment(date));
    }

    return new Handlebars.SafeString(outDate);
});

Handlebars.registerHelper('SetFinishedCheckBox', function (finishedDate:string) {
    let CheckboxHTML:string = "";
    let CheckboxLabelHTML:string = '<label for="cb_note-finished"></label>';

    if (moment(finishedDate).isValid()) {     // set Checkbox checked if valid finishedDate
        CheckboxHTML = CheckboxLabelHTML;
        CheckboxHTML += '<input type="checkbox" id="cb_note-finished" checked class="note-finished">';
    }
    else { // set Checkbox unchecked
        CheckboxHTML = CheckboxLabelHTML;
        CheckboxHTML += '<input type="checkbox" id="cb_note-finished" class="note-unfinished">'
    }                                  // set Checkbox unchecked
    return new Handlebars.SafeString(CheckboxHTML);
});

Handlebars.registerHelper('SetDescription', function (description:string){
    let descriptionHTML:string ="";
    let accFirstLine:string="";
    let accContent:string="";
    const MaxLen: number = 60;
    if (typeof(description)==="string") {
        if (description.length > MaxLen) {  // Create Accordion
            // descriptionHTML="Accordion: " + description.length.toString();
            accFirstLine= description.substr(0,MaxLen);
            accContent=description.substr(MaxLen,description.length);
            descriptionHTML = `<p class="accFirstRow">${accFirstLine}</p> <p class="accContent">${accContent}</p>`;
        }
        else{
            descriptionHTML=`<p>${description}</p>`;
        }
    }
    return new Handlebars.SafeString(descriptionHTML);
});
