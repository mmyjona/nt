// Check the license plates of all Chinese provinces.
"use strict";

var Province = function() {
    LocalContractStorage.defineMapProperty(this, "proMap");
};

Province.prototype = {
    init: function() {
        //provice
        this.proMap.set('china','北京市,天津市,上海市,重庆市,河北省,山西省,辽宁省,吉林省,黑龙江省,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,海南省,四川省,贵州省,云南省,陕西省,甘肃省,青海省,台湾省,内蒙古自治区,广西壮族自治区,西藏自治区,宁夏回族自治区,新疆维吾尔自治区,香港特别行政区,澳门特别行政区');
        //license plates
        this.proMap.set('北京市','京A,京C,京E,京F,京H,京J,京K,京L,京M:北京市(城区),京G,京Y:北京市(远)');
        this.proMap.set('天津市','津A,津B,津C,天津市:,津E:出租车');
        this.proMap.set('上海市','沪A,沪B,沪D:上海市区,沪C:远郊区');
        this.proMap.set('重庆市','渝A:重庆市区（江南）,渝B:重庆市区（江北）,渝C:永川区,渝F:万州区,渝G:涪陵区,渝H:黔江区');
        this.proMap.set('河北省','冀A:石家庄,冀B:唐山,冀C:秦皇岛,冀D:邯郸,冀E:邢台,冀F:保定,冀G:张家口,冀H:承');
        this.proMap.set('山西省','晋A:太原,晋B:大同,晋C:阳泉,晋D:长治,晋E:晋城,晋F:朔州,晋G:雁北,晋H:忻州,晋J:吕梁,晋K:晋中,晋L:临汾,晋M:运城');
        this.proMap.set('辽宁省','辽A:沈阳,辽B:大连,辽C:鞍山,辽D:抚顺,辽E:本溪,辽F:丹东,辽G:锦州,辽H:营口,辽J:');
        this.proMap.set('吉林省','吉A:长春,吉B:吉林,吉C:四平,吉D:辽源,吉E:通化,吉F:白山,吉G:白城,吉H:延边朝鲜族');
        this.proMap.set('黑龙江省','黑A:哈尔滨:,黑B:齐齐哈尔,黑C:牡丹江,黑D:佳木斯,黑E:大庆,黑F:伊春,黑G:鸡西,黑');
        this.proMap.set('江苏省','苏A:南京,苏B:无锡,苏C:徐州,苏D:常州,苏E:苏州,苏F:南通,苏G:连云港,苏H:淮阴,苏');
        this.proMap.set('浙江省','浙A:杭州,浙B:宁波,浙C:温州,浙D:绍兴,浙E:湖州,浙F:嘉兴,浙G:金华');
        this.proMap.set('安徽省','皖A:合肥,皖B:芜湖,皖C:蚌埠,皖D:淮南,皖E:马鞍山,皖F:淮北,皖G:铜陵,皖H:安庆,皖J:黄山,皖K:阜阳,皖L:宿州,皖M:滁州,皖N:六安,皖P:宣城,皖Q:巢湖,皖R:池州');
        this.proMap.set('福建省','闽A:福州,闽B:莆田,闽C:泉州,闽D:厦门,闽E:漳州,闽F:龙岩,闽G:三明,闽H:南平,闽J:宁德,闽K:省直机关');
        this.proMap.set('江西省','赣A:南昌,赣B:赣州,赣C:宜春,赣D:吉安,赣E:上饶,赣F:抚州,赣G:九江,赣H:景德镇,赣J:萍乡,赣K:新余,赣L:鹰潭');
        this.proMap.set('山东省','鲁A:济南,鲁B:青岛,鲁C:淄博,鲁D:枣庄,鲁E:东营,鲁F:烟台,鲁G:潍坊,鲁H:济宁,鲁J:泰安,鲁K:威海,鲁L:日照,鲁M:莱芜,鲁N:德州,鲁P:聊城,鲁Q:临沂,鲁R:菏泽,鲁U:青岛开发区');
        this.proMap.set('河南省','豫A:郑州,豫B:开封,豫C:洛阳,豫D:平顶山,豫E:安阳,豫F:鹤壁,豫G:新乡,豫H:焦作,豫J:濮阳,豫K:许昌,豫L:漯河,豫M:三门峡,豫N:商丘,豫P:周口,豫Q:驻马店,豫R:南阳,豫S:信阳,豫U:济源');
        this.proMap.set('湖北省','鄂A:武汉,鄂B:黄石,鄂C:十堰,鄂D:沙市,鄂E:宜昌,鄂F:襄樊,鄂G:鄂州,鄂H:荆门,鄂J:黄岗,鄂K:孝感,鄂L:咸宁,鄂M:荆州,鄂N:郧阳,鄂P:宜昌,鄂Q:鄂西州');
        this.proMap.set('湖南省','湘A:长沙,湘B:株洲,湘C:湘潭,湘D:衡阳,湘E:邵阳,湘F:岳阳,湘G:大庸,湘H:益阳,湘J:常德,湘K:娄底,湘L:郴州,湘M:零陵,湘N:怀化,湘P:湘西州');
        this.proMap.set('广东省','粤A:广州,粤B:深圳,粤C:珠海,粤D:汕头,粤E:佛山,粤F:韶关,粤G:湛江,粤H:肇庆,粤J:江门,粤K:茂名,粤L:惠州,粤M:梅州,粤N:汕尾,粤P:河源,粤Q:阳江,粤R:清远,粤S:东莞,粤T:中山,粤U:潮州,粤V:揭阳,粤W:云浮,粤X:顺德,粤Y:南海,粤Z港澳进入内地车辆');
        this.proMap.set('海南省','琼A:海口::琼B:三亚琼::C:琼北');
        this.proMap.set('四川省','川A:成都,川B:绵阳,川C:自贡,川D:攀枝花,川E:泸州,川F:德阳,川H:广元,川J:遂宁,川K:内江,川L:乐山,川Q:宜宾,川R:南充,川S:达县,川T:雅安,川U:阿坝藏族,川V:甘孜藏族,川W:凉山彝族');
        this.proMap.set('贵州省','贵A:贵阳,贵B:六盘水,贵C:遵义,贵D:铜仁,贵E:黔西南州,贵F:毕节,贵G:安顺,贵H:黔东南州,贵J:黔南州');
        this.proMap.set('云南省','云A:昆明,云B:东川,云C:昭通,云D:曲靖,云E:楚雄彝族,云F:玉溪,云G:红河哈尼族,云H:文山壮族苗,云J:思茅,云L:大理白族,云K:西双版纳,云M:保山,云N:德宏傣族,云P:丽江,云Q:怒江傈族,云R:迪庆藏族,云S:临沧');
        this.proMap.set('陕西省','陕A:西安,陕B:铜川,陕C:宝鸡,陕D:威阳,陕E:渭南,陕F:汉中,陕G:安康,陕H:商洛,陕J:延安,陕K:榆林,陕U:省直机关');
        this.proMap.set('甘肃省','甘A:兰州,甘B:嘉峪关,甘C:金昌,甘D:白银,甘E:天水,甘F:酒泉,甘G:张掖,甘H:武威,甘J:定西,甘K:陇南,甘L:平凉,甘M:庆阳:,甘N:临夏回族,甘P:甘南藏族');
        this.proMap.set('青海省','青A:西宁,青B:海东,青C:海北,青D:黄南,青E:海南州,青F:果洛州,青G:玉树州,青H:海西州');
        this.proMap.set('台湾省','');
        this.proMap.set('内蒙古自治区','蒙A:呼和浩特,蒙B:包头,蒙C:乌海,蒙D:赤峰,蒙E:呼伦贝尔盟,蒙F:兴安盟,蒙G:锡林郭勒盟,蒙H:乌兰察布盟,蒙J:伊克昭盟,蒙K:巴彦淖尔盟,蒙L:阿拉善盟');
        this.proMap.set('广西壮族自治区','桂A:南宁,桂B:柳州,桂C:桂林,桂D:梧州,桂E:北海,桂F:南宁,桂G:柳州,桂H:桂林,桂J:梧州,桂K:玉林,桂M:河池,桂L:百色,桂N:钦州,桂P:防城');
        this.proMap.set('西藏自治区','藏A:拉萨,藏B:昌都,藏C:山南,藏D:日喀则,藏E:那曲,藏F:阿里,藏G:林芝');
        this.proMap.set('宁夏回族自治区','宁A:银川,宁B:石嘴山,宁C:银南,宁D:固原');
        this.proMap.set('新疆维吾尔自治区','浙A:杭州,浙B:宁波,浙C:温州,浙D:绍兴,浙E:湖州,浙F:嘉兴,浙G:金');
        this.proMap.set('香港特别行政区','');
        this.proMap.set('澳门特别行政区','');
    },
    getAll: function(key) {
        var result = '';
        result = this.proMap.get(key);
        return result
    }
};

module.exports = Province;