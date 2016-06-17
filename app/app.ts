/**
 * Class App for methods with app scope like style change
 *
 */
const PATHSTYLE:string = "app/scss/style.css";
const PATHDARKSTYLE:string = "app/scss/darkstyle.css";

class App {

    changeStyleSheet(Theme:StyleSheetTheme) {

        let StyleTheme:string = "";
        if (Theme === StyleSheetTheme.StandardTheme) {
            StyleTheme = PATHSTYLE;
        }
        else {
            StyleTheme = PATHDARKSTYLE;
        }
        /* Save Style to local Storage */
        localStorage.setItem(NOTE_STYLE, JSON.stringify(StyleTheme));
        /* Change Style */
        $("link").attr("href", StyleTheme);
    }

    getStyleSheetfromLocalStorage(Theme:StyleSheetTheme) {
        let StyleSheet:string = "";
        StyleSheet = JSON.parse(localStorage.getItem(NOTE_STYLE));
        if (StyleSheet === PATHSTYLE) {
            Theme = StyleSheetTheme.StandardTheme
        }
        else {
            Theme = StyleSheetTheme.DarkTheme
        }
        return Theme
    }
}