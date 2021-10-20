import { createContext, useState, useEffect, useContext } from "react";
import Blockly from "blockly";

export const ThemeContext = createContext();
const dark_block_styles = {
    "loop_blocks": {
        "colourPrimary": "#c7b01a",
        "colourSecondary": "#AD7BE9",
        "colourTertiary": "#CDB6E9"
    },
    "logic_blocks": {
        "colourPrimary": "#c91818",
        "colourSecondary": "#64C7FF",
        "colourTertiary": "#C5EAFF"
    },
    "math_blocks": {
        "colourPrimary": "#03254c",
        "colourSecondary": "#A334C5",
        "colourTertiary": "#A3DB55"
    },
    "colour_blocks": {
        "colourPrimary": "#23445b",
        "colourSecondary": "#dbc7bd",
        "colourTertiary": "#845d49"
    },
    "variable_blocks": {
        "colourPrimary": "#525b99",
        "colourSecondary": "#dbbdd6",
        "colourTertiary": "#84497a"
    },
    "procedure_blocks": {
        "colourPrimary": "#995ba5",
        "colourSecondary": "#d6bddb",
        "colourTertiary": "#7a4984"
    },

}
const dark_component_styles = {
    "workspaceBackgroundColour": "#060841",
    "flyoutBackgroundColour": "#0B0533"
}
const light_block_styles = {
    "loop_blocks": {
        "colourPrimary": "#c7b01a",
        "colourSecondary": "#AD7BE9",
        "colourTertiary": "#CDB6E9"
    },
    "logic_blocks": {
        "colourPrimary": "#c91818",
        "colourSecondary": "#64C7FF",
        "colourTertiary": "#C5EAFF"
    },
    "math_blocks": {
        "colourPrimary": "#03254c",
        "colourSecondary": "#A334C5",
        "colourTertiary": "#A3DB55"
    },
    "colour_blocks": {
        "colourPrimary": "#23445b",
        "colourSecondary": "#dbc7bd",
        "colourTertiary": "#845d49"
    },
    "variable_blocks": {
        "colourPrimary": "#525b99",
        "colourSecondary": "#dbbdd6",
        "colourTertiary": "#84497a"
    },
    "procedure_blocks": {
        "colourPrimary": "#995ba5",
        "colourSecondary": "#d6bddb",
        "colourTertiary": "#7a4984"
    },

}
const light_component_styles = {
    "workspaceBackgroundColour": "#EFEFF2",
    "flyoutBackgroundColour": "#DEDEF1"
}
var dark_theme = Blockly.Theme.defineTheme('dark_theme', {
    'blockStyles': dark_block_styles,
    'componentStyles': dark_component_styles,
    'startHats': true
});
var light_theme = Blockly.Theme.defineTheme('light_theme', {
    'blockStyles': light_block_styles,
    'componentStyles': light_component_styles,
    'startHats': true
});



const ThemeContextProvider = (props) => {
    const [current_theme, setCurrentTheme] = useState(null)

    class Theme {
        primaryColor
        secondaryColor
        tetiaryColor
        borderColor
        innerShadowColor
        titleTextColor
        textColor
        logoColor
        progressEmptyBarColor
        progressFilledBarColor
        primaryButtonColor
        tabColor
        dropShadowStatus
        constructor(primary, secondary, tetiary, border, innerShadow, titleTextColor, textColor, logoColor, progressEmptyBarColor, progressFilledBarColor, primaryButtonColor, tabColor, dropShadowStatus) {
            this.primaryColor = primary;
            this.secondaryColor = secondary;
            this.tetiaryColor = tetiary;
            this.borderColor = border;
            this.innerShadowColor = innerShadow
            this.titleTextColor = titleTextColor;
            this.textColor = textColor;
            this.logoColor = logoColor;
            this.progressEmptyBarColor = progressEmptyBarColor
            this.progressFilledBarColor = progressFilledBarColor;
            this.primaryButtonColor = primaryButtonColor;
            this.tabColor = tabColor
            this.dropShadowStatus = dropShadowStatus;
        }
    }

    var globalDarkTheme = new Theme(
        "#0B0533",  //primaryColor
        "#0000DC",  //secondaryColor
        "#060841",  //tetiaryColor
        "#0000DC",  //borderColor
        "#0713BF52",    //innerShadowColor
        "#4C97FF",  //titleTextColor
        "#FFFFFF",  //textColor
        "#FFFFFF",  //logoColor
        "#1C1E4D",  //progressEmptyBar
        "#E9E9FF",  //progressFilledBar
        "#FFFFFF",  //primaryButtonColor
        "#0B0533",   //tabColor
        true        //dropShadowStatus
        )
        ; 
    var globalLightTheme = new Theme(
        "#DEDEF1",  //primaryColor
        "#0000DC",  //secondaryColor
        "#FFFFFF",  //tetiaryColor
        "#9898F0",  //borderColor
        "#BCBCEE",  //innerShadowColor
        "#0000DC",  //titleTextColor
        "#000092",  //textColor
        "#0000DC",  //logoColor
        "#BCBCEE",  //progressEmptyBar
        "#0000DC",  //progressFilledBar
        "#0000DC",  //primaryButtonColor
        "#DEDEF1",   //tabColor
        false       //dropShadowStatus
        );

    function changeTheme(event) {
        if (event.target.id == "dark-theme") {
            setCurrentTheme(globalDarkTheme);
            Blockly.mainWorkspace.setTheme(dark_theme)
            Blockly.mainWorkspace.toolbox_.setVisible(false);
        }
        else {
            setCurrentTheme(globalLightTheme);
            Blockly.mainWorkspace.setTheme(light_theme)
            Blockly.mainWorkspace.toolbox_.setVisible(false);
        }
    }

    useEffect(() => {
        if(current_theme !== null) {
            document.documentElement.style.setProperty('--primary-color', current_theme.primaryColor);
            document.documentElement.style.setProperty('--secondary-color', current_theme.secondaryColor);
            document.documentElement.style.setProperty('--tetiary-color', current_theme.tetiaryColor);
            document.documentElement.style.setProperty('--border-color', current_theme.borderColor);
            document.documentElement.style.setProperty('--logo-color', current_theme.logoColor);
            document.documentElement.style.setProperty('--inner-shadow-color', current_theme.innerShadowColor)
            document.documentElement.style.setProperty('--title-text-color', current_theme.titleTextColor);
            document.documentElement.style.setProperty('--text-color', current_theme.textColor)
            document.documentElement.style.setProperty('--logo-color', current_theme.logoColor);
            document.documentElement.style.setProperty('--progress-empty-bar-color', current_theme.progressEmptyBarColor);
            document.documentElement.style.setProperty('--progress-filled-bar-color', current_theme.progressFilledBarColor);
            document.documentElement.style.setProperty('--primary-button-color', current_theme.primaryButtonColor);
            document.documentElement.style.setProperty('--tab-color', current_theme.tabColor)
        }
    },[current_theme])

    return (<ThemeContext.Provider value={{
        current_theme,
        dark_theme,
        light_theme,
        changeTheme
    }}>
        {props.children}
    </ThemeContext.Provider>
    )
}

export default ThemeContextProvider
export {dark_theme}