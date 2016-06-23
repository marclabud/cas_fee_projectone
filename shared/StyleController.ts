'use strict';

const PATHSTYLE:string = "app/scss/style.css";
const PATHDARKSTYLE:string = "app/scss/darkstyle.css";

const HREF_PREFIX_STYLE:string = "./";
const HREF_PREFIX_DARKSYTLE:string = "../";

/* ENUM StyleSheetTheme */
enum StyleSheetTheme {
    StandardTheme,
    DarkTheme
}

class StyleController {

    private theme:StyleSheetTheme;
    private styleHrefPrefix:string;

    constructor(hrefPrefix:string) {
        this.styleHrefPrefix = hrefPrefix;
        this.initStylesheet(this.styleHrefPrefix);
        this.registerListboxStyleChanger();
    }

    getStyleSheetFromLocalStorage() {
        let styleSheet:string = "";
        let theme:StyleSheetTheme = null;

        styleSheet = JSON.parse(localStorage.getItem(NOTE_STYLE));
        if (styleSheet === PATHSTYLE) {
            theme = StyleSheetTheme.StandardTheme
        }
        else {
            theme = StyleSheetTheme.DarkTheme
        }
        return theme
    }

    private registerListboxStyleChanger():void {
        $("#ddlb_stylesheetSelect").on('change', this.styleSheetEvent.bind(this));
    }

    private styleSheetEvent(event:Event):void {
        let target:any = event.target;
        let SelectedStyle:string = target.value;
        if (SelectedStyle === "StyleOne") {
            this.changeStyleSheet(StyleSheetTheme.DarkTheme, this.styleHrefPrefix)
        }
        else {
            this.changeStyleSheet(StyleSheetTheme.StandardTheme, this.styleHrefPrefix)
        }
        console.log("Selected Style", SelectedStyle);
    }

    private initStylesheet(hrefPrefix:string):void {
        this.theme = this.getStyleSheetFromLocalStorage();
        this.changeStyleSheet(this.theme, hrefPrefix);
        $("#ddlb_stylesheetSelect").val(this.theme === 1 ? "StyleOne" : "StyleTwo");
    }

    private changeStyleSheet(Theme:StyleSheetTheme, hrefPrefix:string):void {
        let styleTheme:string = "";
        let styleThemeLast:string = "";
        if (Theme === StyleSheetTheme.StandardTheme) {
            styleTheme = PATHSTYLE;
            styleThemeLast = PATHDARKSTYLE;
        }
        else {
            styleTheme = PATHDARKSTYLE;
            styleThemeLast = PATHSTYLE;
        }
        /* Save Style to local Storage */
        localStorage.setItem(NOTE_STYLE, JSON.stringify(styleTheme));
        /* Change Style */
        $("link[href='" + hrefPrefix + styleThemeLast + "']").attr("href", hrefPrefix + styleTheme);
    }

}