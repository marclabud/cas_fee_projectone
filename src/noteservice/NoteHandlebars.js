'use strict';
/* Handlebars Helper */
/* Rate transformiert den Score (Ausprägung des Ratings) in HTML
 Der gültige Wertebereich beträgt 0 bis BESTRATING.
 Wird ein ungüliger Wert übergeben, wird die class error-sign generiert*/
Handlebars.registerHelper('rate', function (rating) {
    var RatingHTML = "";
    var BESTRATING = 5;
    if (rating >= 0 && rating <= BESTRATING) {
        for (var i = 1; i <= BESTRATING; i++) {
            if (rating >= i) {
                RatingHTML = RatingHTML + '<span class="scored-sign">&nbsp;</span>';
            }
            else {
                RatingHTML = RatingHTML + '<span class="unscored-sign">&nbsp;</span>';
            }
        }
    }
    else {
        var ERRORSIGNSPAN = '<span class="error-sign">&nbsp;</span>';
        for (var i = 1; i <= BESTRATING; i++) {
            RatingHTML = RatingHTML + ERRORSIGNSPAN;
        }
    }
    return new Handlebars.SafeString(RatingHTML);
});
/* Showdate zeigt ein Datum der Note mit einem Präfix an
 *  Mit dem Präfix (optional) kann eine Beschreibung des Datums mitgegeben werden*/
Handlebars.registerHelper('showdate', function (date, prefixText) {
    var DATEFORMAT = "LL";
    var outDate = "";
    if (!(typeof (prefixText) === "string")) {
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
Handlebars.registerHelper('SetFinishedCheckBox', function (finishedDate) {
    var CheckboxHTML = "";
    var CheckboxLabelHTML = '<label for="cb_note-finished"></label>';
    if (moment(finishedDate).isValid()) {
        CheckboxHTML = CheckboxLabelHTML;
        CheckboxHTML += '<input type="checkbox" id="cb_note-finished" checked class="note-finished">';
    }
    else {
        CheckboxHTML = CheckboxLabelHTML;
        CheckboxHTML += '<input type="checkbox" id="cb_note-finished" class="note-unfinished">';
    } // set Checkbox unchecked
    return new Handlebars.SafeString(CheckboxHTML);
});
Handlebars.registerHelper('SetDescription', function (description) {
    var descriptionHTML = "";
    var accFirstLine = "";
    var accContent = "";
    var MaxLen = 60;
    if (typeof (description) === "string") {
        if (description.length > MaxLen) {
            // descriptionHTML="Accordion: " + description.length.toString();
            accFirstLine = description.substr(0, MaxLen);
            accContent = description.substr(MaxLen, description.length);
            descriptionHTML = "<p class=\"accFirstRow\">" + accFirstLine + "</p> <p class=\"accContent\">" + accContent + "</p>";
        }
        else {
            descriptionHTML = "<p>" + description + "</p>";
        }
    }
    return new Handlebars.SafeString(descriptionHTML);
});
//# sourceMappingURL=NoteHandlebars.js.map