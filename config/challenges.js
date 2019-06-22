const Challenge = require('../models/Challenge');
const ChallengesArray = require('../challenges');

if(ChallengesArray) {
  ChallengesArray.map(item => {
    Challenge
    .findOne({name: item.name})
    .exec(function(err, challenge){
      if (!challenge){
        var c = new Challenge();
        c.name = item.name;
        c.save(function(err) {
          if (err){
            console.log(err);
          }
        });
      }
    });
  });
}