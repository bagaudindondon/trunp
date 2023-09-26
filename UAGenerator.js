"use strict";
var UAGenerator = function(){
    this.isArray = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    },
    this.isString= function(e) {
        return"string" == typeof e
    },
    this.isUndefined=function(e){
        return void 0===e
    },
    this.get=function(e){
        return this.isArray(e) ? e[Math.floor(Math.random()*e.length)] : null
    },
    this.patterns={
        locales:["en-(US|AU|CA|IN|IE|MT|NZ|PH|SG|ZA|GB|US)"],
        net_clr:{
            v1:["( \\.NET CLR 1\\.[0-1]\\.[4-5]07[0-5][0-9];|)"],
            v2up:["( \\.NET CLR [2-3]\\.[1-8]\\.[3-5]07[0-9][0-9];|)"]
        },
        media_server:["( Media Center PC [4-6]\\.0;|)"],
        windows:["Windows NT (6\\.[1-3]|10\\.0)"],
        macos:{
            v10_blink:["Intel Mac OS X 10_(1[0-4])_[0-4]"],
            v10_firefox:["Intel Mac OS X 10\\.(1[0-4])"]
        },
        applewebkit:["AppleWebKit/(60[1-5]\\.[1-7]\\.[1-8])","AppleWebKit/(53[5-8]\\.[1-2][0-9]\\.[1-3][0-9])"],
        browsers_versions:{
            chrome:[
                "(75\\.0\\.3770|76\\.0\\.3809|77\\.0\\.3833)\\.(?:[89]\\d|1[0-4]{2})"
            ],
            safari:[
                "1[12]\\.[0-1]\\.[1-5]"
            ],firefox:[
                "6[0789]\\.0"
            ],
            opera:[
                "4[4-6]\\.0\\.2[1-3][0-9][0-9]\\.([1-2]|)[1-9][0-9]"
            ],
            edge:[
                "Chrome/52\\.0\\.2743\\.116 Safari/537\\.36 Edge/15\\.15063",
                "Chrome/58\\.0\\.3029\\.110 Safari/537\\.36 Edge/16\\.16299",
                "Chrome/64\\.0\\.3282\\.140 Safari/537\\.36 Edge/17\\.17134",
                "Chrome/64\\.0\\.3282\\.140 Safari/537\\.36 Edge/18\\.17763"
            ]
        }
    },
    this.useragents={
        chrome:{
            win:{
                name:"Chrome on Windows",
                regexp:[
                    "Mozilla/5\\.0 \\("+this.get(this.patterns.windows)+"(; Win64; x64|; WOW64|)\\) AppleWebKit/537\\.36 \\(KHTML, like Gecko\\) Chrome/("+this.get(this.patterns.browsers_versions.chrome)+") Safari/537\\.36"
                ]
            },
            mac:{
                name:"Chrome on Mac",
                regexp:[
                    "Mozilla/5\\.0 \\(Macintosh; "+this.get(this.patterns.macos.v10_blink)+"\\) AppleWebKit/537\\.36 \\(KHTML, like Gecko\\) Chrome/("+this.get(this.patterns.browsers_versions.chrome)+") Safari/537\\.36"
                ]
            }
        },
        firefox:{
            win:{
                name:"Firefox on Windows",
                regexp:[
                    "Mozilla/5\\.0 \\("+this.get(this.patterns.windows)+"; (WOW64|Win64); rv:("+this.get(this.patterns.browsers_versions.firefox)+")\\) Gecko/20100101 Firefox/(\\3)"
                ]
            },
            mac:{
                name:"Firefox on Mac",
                regexp:[
                    "Mozilla/5\\.0 \\(Macintosh;( U; | )"+this.get(this.patterns.macos.v10_firefox)+"; rv:("+this.get(this.patterns.browsers_versions.firefox)+")\\) Gecko/20100101 Firefox/(\\3)"
                ]
            },
        },
        safari:{
            mac:{
                name:"Safari on Mac",
                regexp:[
                    "Mozilla/5\\.0 \\(Macintosh;( U; | )"+this.get(this.patterns.macos.v10_blink)+"; "+this.get(this.patterns.locales)+"\\) "+this.get(this.patterns.applewebkit)+" \\(KHTML, like Gecko\\) Version/"+this.get(this.patterns.browsers_versions.safari)+" Safari/(\\4)"
                ]
            },
        },
        opera:{
            win:{
                name:"Opera on Windows",
                regexp:[
                    "Mozilla/5\\.0 \\("+this.get(this.patterns.windows)+"(; Win64; x64|; WOW64|)\\) AppleWebKit/537\\.36 \\(KHTML, like Gecko\\) Chrome/("+this.get(this.patterns.browsers_versions.chrome)+") Safari/537\\.36 OPR/"+this.get(this.patterns.browsers_versions.opera)
                ]
            },
            mac:{
                name:"Opera on Mac",
                regexp:[
                    "Mozilla/5\\.0 \\(Macintosh; "+this.get(this.patterns.macos.v10_blink)+"\\) AppleWebKit/537\\.36 \\(KHTML, like Gecko\\) Chrome/("+this.get(this.patterns.browsers_versions.chrome)+") Safari/537\\.36 OPR/"+this.get(this.patterns.browsers_versions.opera)
                ]
            },
        }
    },
    this.randexp=function(e){
        if("undefined"==typeof RandExp)
            throw new Error('"RandExp" component must be included first');
        return this.isString(e) ? new RandExp(e).gen() : !!console.error("regexp must be string")
    },
    this.getAllByKeyName=function(e,t){
        var i=[];
        return this.recursive=function(e,t){
            for(var s in e)
                "object" != typeof e[s] || this.isArray(e[s]) || null===e[s] ? s===t&&i.push(e[s]) : this.recursive(e[s],t)
        },
        this.recursive(e,t),i
    },
    this.testAllRegexp=function(){
        var e=this.getAllByKeyName(this.useragents,"regexp");
        if(this.isArray(e)){
            var t=e.length;
            if(t>0)
                for(var i=0;i<t;i++){
                    var s=e[i],r=s.length;
                    console.info("Testing regexps ("+r+') "'+s+'"');
                    for(var n=0;n<r;n++){
                        console.log("> Generate value for regexp: "+s[n]);
                        for(var o=0;o<9;o++)
                            console.log(">> Generated value: "+this.randexp(s[n]))
                    }
                }
        }
        else 
            console.error("Regexps variable must be an array and dont be empty",e);
        return null
    },
    this.generate=function(e){
        this.isString(e)&&(e=[e]),
        this.isArray(e) || (e=[]),
        e.length<=0&&(e=["*"]);
        for(var t=[],i=0,s=e.length;i<s;i++) {
            if("*"===e[i])
                return this.randexp(this.get(this.get(this.getAllByKeyName(this.useragents,"regexp"))));
            var r,n,o=e[i].split("_");
            !this.isUndefined(o[0]) && this.isString(o[0]) && (r=o[0]),
            !this.isUndefined(o[1]) && this.isString(o[1]) && (n=o[1]),
            this.isUndefined(r) || this.isUndefined(n) || this.isUndefined(this.useragents[r][n]) || t.push(this.get(this.useragents[r][n].regexp))
        }
        return t.length>0?this.randexp(this.get(t)):!!console.error("User-Agent patterns not found")
    }
};