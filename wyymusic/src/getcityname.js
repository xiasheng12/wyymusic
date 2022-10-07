export default function getcityname(cityid){
    // if(cityid.toString().substring(0,4)=='1101'){
    //     return '北京 市辖区'
    // }else if()
    let name=''
    switch (cityid.toString().substring(0,4)) {
        case '1101':
            name='北京 市辖区'
            break;
        case '1102':
            name='北京 县'
        break;
        case '1201':
            name='天津 市辖区'
        break;
        case '1202':
            name='天津 县'
        break;
        case '1301':
            name='河北 石家庄'
        break;
        case '1302':
            name='河北 唐山'
        break;
        case '1303':
            name='河北 秦皇岛'
        break;
        case '1304':
            name='河北 邯郸'
        break;
        case '1305':
            name='河北 邢台'
        break;
        case '1306':
            name='河北 保定'
        break;
        case '1307':
            name='河北 张家口'
        break;
        case '1308':
            name='河北 承德'
        break;
        case '1309':
            name='河北 沧州'
        break;
        case '1310':
            name='河北 廊坊'
        break;
        case '1311':
            name='河北 衡水'
        break;
        case '1401':
            name='山西 太原'
        break;
        case '1402':
            name='山西 大同'
        break;
        case '1403':
            name='山西 阳泉'
        break;
        case '1404':
            name='山西 长治'
        break;
        case '1405':
            name='山西 晋城'
        break;
        case '1406':
            name='山西 朔州'
        break;
        case '1407':
            name='山西 晋中'
        break;
        case '1408':
            name='山西 运城'
        break;
        case '1409':
            name='山西 忻州'
        break;
        case '1410':
            name='山西 临汾'
        break;
        case '1411':
            name='山西 吕梁'
        break;
        case '1411':
            name='山西 吕梁'
        break;
        case '3301':
            name='浙江 杭州'
        break;
        case '3601':
            name='江西 南昌'
        break;
        case '3602':
            name='江西 景德镇'
        break;
        case '3603':
            name='江西 萍乡'
        break;
        case '3604':
            name='江西 九江'
        break;
        case '3605':
            name='江西 新余'
        break;
        case '3606':
            name='江西 鹰潭'
        break;
        case '3607':
            name='江西 赣州'
        break;
        case '3608':
            name='江西 吉安'
        break;
        case '3609':
            name='江西 宜春'
        break;
        case '3610':
            name='江西 抚州'
        break;
        case '3611':
            name='江西 上饶'
        break;
        default:
            name='暂无此地区'
            break;
    }
    return name
}