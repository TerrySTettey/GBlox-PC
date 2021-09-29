const AlterBlockly = () => {
var AllScrolls = document.getElementsByClassName("blocklyScrollbarHandle");
      var i = 0;
      for (i = 0; i < AllScrolls.length; i++) {
        AllScrolls[i].style.display = "none";
      }

      var BackgroundStrokes = document.getElementsByClassName("blocklyMainBackground");
      i = 0;
      for (i = 0; i < BackgroundStrokes.length; i++) {
        BackgroundStrokes[i].style.stroke = "#0000";
      }
}

export default AlterBlockly


