//
// MoveSpecificFiles -- Move filename contain specific characters to assigning folder.
// 2022.08.23 Created by Chris Yang
function MoveSpecificFiles()
{
 //取得此script置放於根目錄下，所以取得家目錄。
  var scriptId = ScriptApp.getScriptId();
  //console.info('scriptId = ' + scriptId);
  var file = DriveApp.getFileById(scriptId);
  var folders = file.getParents();
  var sFileName='';
  
  var sCondition1 = "2018";
  var sCondition2 = "line";
  var sCondition3 = "Screenshot";
  var sFileType = "image";
  var sFileTypeAll = "video";
  var sFolderID = "<your google drive ID>";

  if (folders.hasNext())
  {
    var folder = folders.next();
    var name = folder.getName();
    //確認取得的目錄名稱
    console.info('script folder name = ' + name);  
    
    //統計移動的檔案數量，跑到逾時（超過六分鐘）就看不到了
    var JumpCount = 0, MoveCount = 0, total = 0;

    //取得根目錄下的檔案
    var files = folder.getFiles();
    while (files.hasNext()){
      var sFile = files.next();
      total ++;
      var sFileName = sFile.getName();
      var sFileType = sFile.getMimeType();
      //console.info(sFileName + " : " + sFileType)
      if ((sFileName.substring(0,4) == sCondition1 && sFileType.substring(0,5) == sFileType )  
       ||  (sFileName.substring(0,4) == sCondition2  && sFileType.substring(0,5) == sFileType) 
       || (sFileName.substring(0,10) == sCondition3  && sFileType.substring(0,5) == sFileType) 
               || (sFileType.substring(0,5) == sFileTypeAll))
       {
        //console.info(sFileName + ' - ' + sFileType ) 
        
        sFile.moveTo(DriveApp.getFolderById(sFolderID));
        console.info('移動檔案： ' + sFileName);
        MoveCount++;
      }
      else{
        console.info('跳過的檔案：' + sFileName + " type: " + sFileType);
        JumpCount++
      }
      if (total % 100 == 0){
        console.info("J: " + JumpCount + " M: " + MoveCount + " Total: " + total);
      }
    }
    console.info("J: " + JumpCount + " M: " + MoveCount + " Total: " + total);
  }  
}