var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},i=e.parcelRequire80e7;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in n){var i=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,i.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequire80e7=i);var r=i("gBDHV"),o=i("kkgZr"),s=i("efez3"),a=i("ipXH7"),l=i("jSbZi");let d;!function(e){e[e.Up=0]="Up",e[e.Down=1]="Down",e[e.Random=2]="Random"}(d||(d={}));var u=i("mDWTX");class p{constructor(e,t){this.noteRanger=e,this.direction=t}next(){const e=this.noteRanger.next(),t=Math.floor(8*Math.random())+1;let n={noteName:e.split("/")[0],group:parseInt(e.split("/")[1])};return n=this.direction===d.Up?u.nextNoteBy(n,t):this.direction===d.Down||Math.random()>.5?u.preNoteBy(n,t):u.nextNoteBy(n,t),{notes:[e,`${n.noteName}/${n.group}`],answer:t}}setDirection(e){this.direction=e}available(){return!0}}const h=document.getElementById("output"),c=document.getElementById("question");new class{replayProvider=new o.ReplayProvider;noteRanger=new r.RangeNoteProvider("c/4","b/5");direction=d.Up;constructor(e,t){this.staveDisplayer=new l.StaveDisplayer(e,"treble"),this.notedisplayer=new s.EqualDurationNoteDisplayer(this.staveDisplayer.getContext(),this.staveDisplayer.getStave(),{clef:"treble",subDuration:2,voiceTime:{beat_value:4,num_beats:4}}),this.intervalProvider=new p(this.noteRanger,this.direction),this.questionView=new a.Question(t,null,8),this.questionView.resultCb=this.onAnswered.bind(this)}question=[];start(){const{notes:e,answer:t}=this.intervalProvider.next();this.question=e,this.notedisplayer.draw(this.question),this.questionView.setAnswer(String(t),["1","2","3","4","5","6","7","8"])}setDirection(){}onAnswered(e,t){let n=this.question.join("-");t?this.replayProvider.addRight(n):this.replayProvider.addWrong(n),this.start()}}(h,c).start();
//# sourceMappingURL=interval-quantities.442c60db.js.map
