/**
 * Created by osujin12 on 2017. 6. 5..
 */
const fs = require('fs');
var dataDir = '/Users/test/Downloads/torrent/';
var moveDir = '/Users/test/Downloads/data/';
var moveList = "";

var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.splice(0, 1);

    files.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = walkSync(dir + '/' + file, filelist);
        }
        else {
            filelist.push(file);
        }
    });
    return files;
};

fs.watch(dataDir, function(event, filename) {
    var fileList = walkSync(moveDir,"");

    if(filename != '.DS_Store'){
        console.log(filename)
        var words = filename.split(/[\s.]+/);

        if(event == "rename" && moveList != filename )  {

            fileList.forEach(function (element) {
                words.some(function (p1) {
                    var index = element.indexOf(p1);
                    if(index > -1){
                        console.log(dataDir+filename, moveDir+element+"/"+filename);
                        fs.rename(dataDir+filename, moveDir+element+"/"+filename,
                            function (err) {
                                if (err) console.error(err);
                                console.log('renamed complete'); });

                        moveList = filename;
                        return true;
                    }
                });
            });
        }
    }
});

var fileList = walkSync(moveDir,"");
console.log(fileList)


