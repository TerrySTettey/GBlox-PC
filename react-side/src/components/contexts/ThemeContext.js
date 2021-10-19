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
    const [current_theme, setCurrentTheme] = useState("")

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
        constructor(primary, secondary, tetiary, border, innerShadow, titleTextColor, textColor, logoColor, progressEmptyBarColor, progressFilledBarColor, primaryButtonColor, tabColor) {
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
        }
    }

    var globalDarkTheme = new Theme("#0B0533", "#0000DC", "#060841", "#0000DC", "#0713BF52", "#4C97FF", "#FFFFFF", "#FFFFFF", "#1C1E4D", "#E9E9FF","#FFFFFF","#0B0533");
    var globalLightTheme = new Theme("#DEDEF1", "#0000DC", "#FFFFFF", "#9898F0", "#BCBCEE", "#0000DC", "#000092", "#0000DC", "#BCBCEE", "#0000DC","#0000DC","#DEDEF1");

    function changeTheme(event) {
        console.log(event.target.id)
        if (event.target.id == "dark-theme") {
            //Change Blockly Blockly.mainWorkspace theme
            Blockly.mainWorkspace.setTheme(dark_theme)
            Blockly.mainWorkspace.toolbox_.setVisible(false);
            //Change root CSS variables
            document.documentElement.style.setProperty('--primary-color', globalDarkTheme.primaryColor);
            document.documentElement.style.setProperty('--secondary-color', globalDarkTheme.secondaryColor);
            document.documentElement.style.setProperty('--tetiary-color', globalDarkTheme.tetiaryColor);
            document.documentElement.style.setProperty('--border-color', globalDarkTheme.borderColor);
            document.documentElement.style.setProperty('--logo-color', globalDarkTheme.logoColor);
            document.documentElement.style.setProperty('--inner-shadow-color', globalDarkTheme.innerShadowColor)
            document.documentElement.style.setProperty('--title-text-color', globalDarkTheme.titleTextColor);
            document.documentElement.style.setProperty('--text-color', globalDarkTheme.textColor)
            document.documentElement.style.setProperty('--logo-color', globalDarkTheme.logoColor);
            document.documentElement.style.setProperty('--progress-empty-bar-color', globalDarkTheme.progressEmptyBarColor);
            document.documentElement.style.setProperty('--progress-filled-bar-color', globalDarkTheme.progressFilledBarColor);
            document.documentElement.style.setProperty('--primary-button-color', globalDarkTheme.primaryButtonColor);
            document.documentElement.style.setProperty('--tab-color', globalDarkTheme.tabColor)
            setCurrentTheme(globalDarkTheme)
        }
        else {
            //Change Blockly Blockly.mainWorkspace theme
            Blockly.mainWorkspace.setTheme(light_theme)
            Blockly.mainWorkspace.toolbox_.setVisible(false);
            //Change root CSS variables
            document.documentElement.style.setProperty('--primary-color', globalLightTheme.primaryColor);
            document.documentElement.style.setProperty('--secondary-color', globalLightTheme.secondaryColor);
            document.documentElement.style.setProperty('--tetiary-color', globalLightTheme.tetiaryColor);
            document.documentElement.style.setProperty('--border-color', globalLightTheme.borderColor);
            document.documentElement.style.setProperty('--logo-color', globalLightTheme.logoColor);
            document.documentElement.style.setProperty('--inner-shadow-color', globalLightTheme.innerShadowColor)
            document.documentElement.style.setProperty('--title-text-color', globalLightTheme.titleTextColor);
            document.documentElement.style.setProperty('--text-color', globalLightTheme.textColor)
            document.documentElement.style.setProperty('--logo-color', globalLightTheme.logoColor);
            document.documentElement.style.setProperty('--progress-empty-bar-color', globalLightTheme.progressEmptyBarColor);
            document.documentElement.style.setProperty('--progress-filled-bar-color', globalLightTheme.progressFilledBarColor);
            document.documentElement.style.setProperty('--primary-button-color', globalLightTheme.primaryButtonColor);
            document.documentElement.style.setProperty('--tab-color', globalLightTheme.tabColor)
            setCurrentTheme(globalLightTheme)
        }
    }



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