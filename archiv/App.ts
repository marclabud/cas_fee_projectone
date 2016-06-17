/**
 * Class App for methods with app scope like style change
 *
 */
const PATHSTYLE:string = "app/scss/style.css";
const PATHDARKSTYLE:string = "app/scss/darkstyle.css";

/* ENUM StyleSheetTheme */
enum StyleSheetTheme {
    StandardTheme,
    DarkTheme
}

class App {

    private theme:StyleSheetTheme;

    initStylesheet(hrefPrefix:string) {
        this.theme = this.getStyleSheetFromLocalStorage();
        this.changeStyleSheet(this.theme, hrefPrefix);
        $("#ddlb_stylesheetSelect").val(this.theme === 1 ? "StyleOne" : "StyleTwo");
     }

    changeStyleSheet(Theme:StyleSheetTheme, hrefPrefix:string) {
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
}