??
app.web.twa_sample_cros_sa.twa?"
attrW
 alpha 2J
 F+Alpha multiplier applied to the base color.*
 ??????????????
font 2?
 ??The reference to the font file to be used. This should be a file in the res/font folder
         and should therefore have an R reference value. E.g. @font/myfont*
?????????????|
fontProviderAuthority 2]
 Y>The authority of the Font Provider to be used for the request.*
??????????????
fontProviderCerts 2?
 ??The sets of hashes for the certificates the provider should be signed with. This is
        used to verify the identity of the provider, and is only required if the provider is not
        part of the system image. This value may point to one list or a list of lists, where each
        individual list represents one collection of signature hashes. Refer to your font provider's
        documentation for these values.*
??????????????

fontProviderFetchStrategy 2?

 ?
?The strategy to be used when fetching font data from a font provider in XML layouts.
        This attribute is ignored when the resource is loaded from code, as it is equivalent to the
        choice of API between {@link
    androidx.core.content.res.ResourcesCompat#getFont(Context, int)} (blocking) and
        {@link
    androidx.core.content.res.ResourcesCompat#getFont(Context, int, FontCallback, Handler)}
        (async).*?
????????????????"??The async font fetch works as follows.
              First, check the local cache, then if the requeted font is not cached, trigger a
              request the font and continue with layout inflation. Once the font fetch succeeds, the
              target text view will be refreshed with the downloaded font data. The
              fontProviderFetchTimeout will be ignored if async loading is specified.????id/async ("??The blocking font fetch works as follows.
              First, check the local cache, then if the requested font is not cached, request the
              font from the provider and wait until it is finished.  You can change the length of
              the timeout by modifying fontProviderFetchTimeout.  If the timeout happens, the
              default typeface will be used instead.????id/blocking(?
fontProviderFetchTimeout 2?
 ?*The length of the timeout during fetching.*?
????????????????"??A special value for the timeout. In this case, the blocking font fetching will not
              timeout and wait until a reply is received from the font provider.????
id/forever ????(?
fontProviderPackage 2?
 ?zThe package for the Font Provider to be used for the request. This is used to verify
        the identity of the provider.*
??????????????
fontProviderQuery 2?
 ?|The query to be sent over to the provider. Refer to your font provider's documentation
        on the format of this string.*
??????????????
	fontStyle 2?
 ??The style of the given font file. This will be used when the font is being loaded into
         the font stack and will override any style information in the font's header tables. If
         unspecified, the value in the font's header tables will be used.*G
E???????????????"????	id/italic ("????	id/normal(?
	fontVariationSettings 2?
 ??The variation settings to be applied to the font. The string should be in the following
         format: "'tag1' value1, 'tag2' value2, ...". If the default variation settings should be
         used, or the font used does not support variation settings, this attribute needs not be
         specified.*
??????????????


fontWeight 2?
 ??The weight of the given font file. This will be used when the font is being loaded into
         the font stack and will override any weight information in the font's header tables. Must
         be a positive number, a multiple of 100, and between 100 and 900, inclusive. The most
         common values are 400 for regular weight and 700 for bold weight. If unspecified, the value
         in the font's header tables will be used.*
??????????????
ttcIndex 2?
 ??The index of the font in the tcc font file. If the font file referenced is not in the
        tcc format, this attribute needs not be specified.*
?????????????`
bool$
 enableNotification 2

 ":@.
enableSiteSettingsShortcut 2

 ":@?
color%
 backgroundColor 2
 
":P????/
browser_actions_bg_grey 2
 
":P????5
browser_actions_divider_color 2
 
":H????2
browser_actions_text_color 2
 
":H????3
browser_actions_title_color 2
 
":P?ȑ?$
colorPrimary 2
 
":P????'
navigationColor 2
 
":P????+
navigationColorDark 2
 
":P????.
navigationDividerColor 2
 
":P????2
	navigationDividerColorDark 2
 
":P????x

 notification_action_color_filter 2
 
":H????2>
?7"5
3????+color/secondary_text_default_material_light2
notification_icon_bg_color 2
 
":H????-
ripple_material_light 2
 
":H????=
%secondary_text_default_material_light 2
 
":H????+
shortcut_background 2
 
":P?????
dimen:
 &browser_actions_context_menu_max_width 2
 ":h??=
(browser_actions_context_menu_min_padding 2
 ":h?(<
'compat_button_inset_horizontal_material 2
 ":h?:
%compat_button_inset_vertical_material 2
 ":h?>
)compat_button_padding_horizontal_material 2
 ":h?<
'compat_button_padding_vertical_material 2
 ":h?3
compat_control_corner_material 2
 ":h??
)compat_notification_large_icon_max_height 2
 ":h??>
(compat_notification_large_icon_max_width 2
 ":h??2
	notification_action_icon_size 2
 ":h?@2

notification_action_text_size 2
 ":h?3
notification_big_circle_margin 2
 ":h?E
!notification_content_margin_start 2
 ":h?2
?":h4
notification_large_icon_height 2
 ":h??3
notification_large_icon_width 2
 ":h??H
$notification_main_column_padding_top 2
 ":h?2
?":hq
 notification_media_narrow_margin 27
 3"1
/????'dimen/notification_content_margin_start2
?":h?1
notification_right_icon_size 2
 ":h? 8
#notification_right_side_padding_top 2
 ":h??
*notification_small_icon_background_padding 2
 ":h?:
%notification_small_icon_size_as_large 2
 ":h?0.
notification_subtext_size 2
 ":h?)
notification_top_pad 2
 ":h?4
notification_top_pad_large_text 2
 ":h?
?
drawablet
 $shortcut_legacy_background__0 2N
????B"@*>
:res/drawable-anydpi-v21/$shortcut_legacy_background__0.xml?
ic_notification_icon 2=
??5"3*1
-res/drawable-mdpi-v4/ic_notification_icon.png2=
??5"3*1
-res/drawable-hdpi-v4/ic_notification_icon.png2>
??6"4*2
.res/drawable-xhdpi-v4/ic_notification_icon.png2?
??7"5*3
/res/drawable-xxhdpi-v4/ic_notification_icon.png2@
??8"6*4
0res/drawable-xxxhdpi-v4/ic_notification_icon.png?
ic_site_settings 29
??1"/*-
)res/drawable-mdpi-v4/ic_site_settings.png29
??1"/*-
)res/drawable-hdpi-v4/ic_site_settings.png2:
??2"0*.
*res/drawable-xhdpi-v4/ic_site_settings.png2;
??3"1*/
+res/drawable-xxhdpi-v4/ic_site_settings.pngj
notification_action_background 2B
?;"9*7
3res/drawable-v21/notification_action_background.xmlE
notification_bg 2,
 ("&*$
 res/drawable/notification_bg.xmlM
notification_bg_low 20
 ,"**(
$res/drawable/notification_bg_low.xml?
notification_bg_low_normal 2E
??=";*9
5res/drawable-mdpi-v4/notification_bg_low_normal.9.png2E
??=";*9
5res/drawable-hdpi-v4/notification_bg_low_normal.9.png2F
??>"<*:
6res/drawable-xhdpi-v4/notification_bg_low_normal.9.png?
notification_bg_low_pressed 2F
??>"<*:
6res/drawable-mdpi-v4/notification_bg_low_pressed.9.png2F
??>"<*:
6res/drawable-hdpi-v4/notification_bg_low_pressed.9.png2G
???"=*;
7res/drawable-xhdpi-v4/notification_bg_low_pressed.9.png?
notification_bg_normal 2A
??9"7*5
1res/drawable-mdpi-v4/notification_bg_normal.9.png2A
??9"7*5
1res/drawable-hdpi-v4/notification_bg_normal.9.png2B
??:"8*6
2res/drawable-xhdpi-v4/notification_bg_normal.9.png?
	notification_bg_normal_pressed 2I
??A"?*=
9res/drawable-mdpi-v4/notification_bg_normal_pressed.9.png2I
??A"?*=
9res/drawable-hdpi-v4/notification_bg_normal_pressed.9.png2J
??B"@*>
:res/drawable-xhdpi-v4/notification_bg_normal_pressed.9.png_

notification_icon_background 29
 5"3*1
-res/drawable/notification_icon_background.xml5
notification_template_icon_bg 2
 
":H??Ι8
!notification_template_icon_low_bg 2
 	":H???gO
notification_tile_bg 21
 -"+*)
%res/drawable/notification_tile_bg.xml?
!notify_panel_notification_icon_bg 2J
??B"@*>
:res/drawable-mdpi-v4/notify_panel_notification_icon_bg.png2J
??B"@*>
:res/drawable-hdpi-v4/notify_panel_notification_icon_bg.png2K
??C"A*?
;res/drawable-xhdpi-v4/notify_panel_notification_icon_bg.pngn
shortcut_legacy_background 2J
????>"<*:
6res/drawable-anydpi-v21/shortcut_legacy_background.xml?
splash 2/
??'"%*#
res/drawable-mdpi-v4/splash.png2/
??'"%*#
res/drawable-hdpi-v4/splash.png20
??("&*$
 res/drawable-xhdpi-v4/splash.png21
??)"'*%
!res/drawable-xxhdpi-v4/splash.png22
??*"(*&
"res/drawable-xxxhdpi-v4/splash.png?
id5
 #accessibility_action_clickable_span 2

 "2 1
accessibility_custom_action_0 2

 "2 1
accessibility_custom_action_1 2

 "2 2
accessibility_custom_action_10 2

 "2 2
accessibility_custom_action_11 2

 "2 2
accessibility_custom_action_12 2

 "2 2
accessibility_custom_action_13 2

 "2 2
accessibility_custom_action_14 2

 "2 2
accessibility_custom_action_15 2

 "2 2
	accessibility_custom_action_16 2

 "2 2

accessibility_custom_action_17 2

 "2 2
accessibility_custom_action_18 2

 "2 2
accessibility_custom_action_19 2

 "2 1
accessibility_custom_action_2 2

 "2 2
accessibility_custom_action_20 2

 "2 2
accessibility_custom_action_21 2

 "2 2
accessibility_custom_action_22 2

 "2 2
accessibility_custom_action_23 2

 "2 2
accessibility_custom_action_24 2

 "2 2
accessibility_custom_action_25 2

 "2 2
accessibility_custom_action_26 2

 "2 2
accessibility_custom_action_27 2

 "2 2
accessibility_custom_action_28 2

 "2 2
accessibility_custom_action_29 2

 "2 1
accessibility_custom_action_3 2

 "2 2
accessibility_custom_action_30 2

 "2 2
accessibility_custom_action_31 2

 "2 1
accessibility_custom_action_4 2

 "2 1
accessibility_custom_action_5 2

 "2 1
accessibility_custom_action_6 2

 "2 1
accessibility_custom_action_7 2

 "2 1
accessibility_custom_action_8 2

 "2 1
 accessibility_custom_action_9 2

 "2 $
!action_container 2

 "2 "
"action_divider 2

 "2  
#action_image 2

 "2 
$action_text 2

 "2 
%actions 2

 "2 
&async 2

 "2 
'blocking 2

 "2 /
(browser_actions_header_text 2

 "2 2
)browser_actions_menu_item_icon 2

 "2 2
*browser_actions_menu_item_text 2

 "2 .
+browser_actions_menu_items 2

 "2 -
,browser_actions_menu_view 2

 "2 
-chronometer 2

 "2 !
.dialog_button 2

 "2 
/forever 2

 "2 
0icon 2

 "2 
1
icon_group 2

 "2 
2info 2

 "2 
3italic 2

 "2 
4line1 2

 "2 
5line3 2

 "2 
6normal 2

 "2 +
7notification_background 2

 "2 ,
8notification_main_column 2

 "2 6
9"notification_main_column_container 2

 "2 
:
right_icon 2

 "2 
;
right_side 2

 "2 -
<tag_accessibility_actions 2

 "2 5
=!tag_accessibility_clickable_spans 2

 "2 -
>tag_accessibility_heading 2

 "2 0
?tag_accessibility_pane_title 2

 "2 /
@tag_screen_reader_focusable 2

 "2 (
Atag_transition_group 2

 "2 3
Btag_unhandled_key_event_manager 2

 "2 /
Ctag_unhandled_key_listeners 2

 "2 
Dtext 2

 "2 
Etext2 2

 "2 
Ftime 2

 "2 
Gtitle 2

 "2 w
integer.
 splashScreenFadeOutDuration 2
 ":0?8
#status_bar_notification_info_maxnum 2
 ":0??
layoute
 !browser_actions_context_menu_page 2<
 8"6*4
0res/layout/browser_actions_context_menu_page.xmle
 browser_actions_context_menu_row 2;
 7"5*3
/res/layout/browser_actions_context_menu_row.xml?
custom_dialog 2(
 $""* 
res/layout/custom_dialog.xml?
notification_action 2.
 *"(*&
"res/layout/notification_action.xml25
?.",**
&res/layout-v21/notification_action.xml?
notification_action_tombstone 28
 4"2*0
,res/layout/notification_action_tombstone.xml2?
?8"6*4
0res/layout-v21/notification_action_tombstone.xml?
 notification_template_custom_big 2?
 ;"9*7
3res/layout-v16/notification_template_custom_big.xml2B
?;"9*7
3res/layout-v21/notification_template_custom_big.xml?
 notification_template_icon_group 2;
 7"5*3
/res/layout/notification_template_icon_group.xml2B
?;"9*7
3res/layout-v21/notification_template_icon_group.xmlq
&notification_template_part_chronometer 2A
 =";*9
5res/layout/notification_template_part_chronometer.xmlc
notification_template_part_time 2:
 6"4*2
.res/layout/notification_template_part_time.xml?
	mipmap?
 ic_launcher 22
??*"(*&
"res/mipmap-mdpi-v4/ic_launcher.png22
??*"(*&
"res/mipmap-hdpi-v4/ic_launcher.png23
??+")*'
#res/mipmap-xhdpi-v4/ic_launcher.png24
??,"**(
$res/mipmap-xxhdpi-v4/ic_launcher.png25
??-"+*)
%res/mipmap-xxxhdpi-v4/ic_launcher.pngJ

raw?
 web_app_manifest 2'
 #"!*
res/raw/web_app_manifest.json??
string4
 appName 2%
 !"
Web Play Billing Sample App(
app_name 2
 "
Play Billing?
assetStatements 2?
 ?"??
?[{ "relation": ["delegate_permission/common.handle_all_urls"], "target": { "namespace": "web", "site": "https://twa-sample-cros-sa.web.app" } }]?/
copy_toast_msg 2"
 "
Link copied to clipboard24
ca,"*(
&S'ha copiat l'enllaç al porta-retalls24
da,"*(
&Linket er kopieret til udklipsholderen2=
fa5"31
/پیوند در بریده‌دان کپی شد2G
ja?"=;
9リンクをクリップボードにコピーしました2h
ka`"^\
Zგაცვლის ბუფერში კოპირებული ბმული2\
paT"RP
Nਲਿੰਕ ਕਲਿੱਪਬੋਰਡ 'ਤੇ ਕਾਪੀ ਹੋ ਗਿਆ2?
ta?"}
{கிளிப்-போர்டுக்கு இணைப்பு நகலெடுக்கப்பட்டது22
nb*"(&
$Linken er kopiert til utklippstavlen2P
beH"FD
BСпасылка скапіравана ў буфер абмену2,
de$"" 
Link in Zwischenablage kopiert2k
nec"a_
]क्लिपबोर्डमा लिंक प्रतिलिपि गरियो2w
teo"mk
iక్లిప్‌బోర్డ్‌కు లింక్ కాపీ చేయబడింది2-
af%"#!
Skakel is na knipbord gekopieer2S
bgK"IG
EВръзката е копирана в буферната памет2e
th]"[Y
Wคัดลอกลิงก์ไปยังคลิปบอร์ดแล้ว2-
fi%"#!
Linkki kopioitu leikepöydälle2d
hi\"ZX
Vलिंक क्लिपबोर्ड पर कॉपी किया गया2l
sid"b`
^සබැඳිය පසුරු පුවරුවට පිටපත් කෙරිණි2H
vi@"><
:Đã sao chép đường liên kết vào khay nhớ tạm2?
kk7"53
1Сілтеме буферге көшірілді.2W
mkO"MK
IЛинкот е копиран во привремена меморија22
sk*"(&
$Odkaz bol skopírovaný do schránky2R
ukJ"HF
DПосилання скопійовано в буфер обміну2R
elJ"HF
DΟ σύνδεσμος αντιγράφηκε στο πρόχειρο20
gl("&$
"Copiouse a ligazón no portapapeis2s
mlk"ig
eക്ലിപ്പ്‌ബോർഡിലേക്ക് ലിങ്ക് പകർത്തി2+
nl#"!
Link naar klembord gekopieerd2(
pl "
Link skopiowany do schowka21
sl)"'%
#Povezava je kopirana v odložišče2+
tl#"!
Nakopya sa clipboard ang link2H
am@"><
:አገናኝ ወደ ቅንጥብ ሰሌዳ ተቀድቷል2S
kmK"IG
Eបាន​ចម្លង​តំណ​ទៅឃ្លីបបត2f
bn^"\Z
Xলিঙ্ক ক্লিপবোর্ডে কপি করা হয়েছে2(
in "
Link disalin ke papan klip2?
knx"vt
rಕ್ಲಿಪ್‌ಬೋರ್ಡ್‌ಗೆ ಲಿಂಕ್ ಅನ್ನು ನಕಲಿಸಲಾಗಿದೆ2H
mn@"><
:Холбоосыг түр санах ойд хуулсан2.
ko&"$"
 클립보드에 링크 복사됨2V
loN"LJ
Hສຳເນົາລິ້ງໃສ່ຄລິບບອດແລ້ວ20
ro("&$
"Linkul a fost copiat în clipboard29
sq1"/-
+Lidhja u kopjua në kujtesën e fragmenteve2=
ar5"31
/تم نسخ الرابط إلى الحافظة.20
fr("&$
"Lien copié dans le presse-papiers2.
hr&"$"
 Veza je kopirana u međuspremnik2Y
mrQ"OM
Kलिंक क्लिपबोर्डवर कॉपी केली2u
orm"ki
gଲିଙ୍କକୁ କ୍ଲିପ୍‍‍ବୋର୍ଡରେ କପି କରାଯାଇଛି2S
srK"IG
EЛинк је копиран у привремену меморију28
	sr-Latn+")'
%Link je kopiran u privremenu memoriju2+
tr#"!
Bağlantı panoya kopyalandı2>
ur6"42
0لنک کلپ بورڈ پر کاپی ہو گیا2l
asd"b`
^লিংক ক্লিপব’ৰ্ডত প্ৰতিলিপি কৰা হ’ল2-
bs%"#!
Link je kopiran u međumemoriju2-
cs%"#!
Odkaz zkopírován do schránky2/
es'"%#
!Enlace copiado en el portapapeles2/
is'"%#
!Tengill afritaður á klippiborð2-
ms%"#!
Pautan disalin ke papan keratan2)
et!"
Link kopeeriti lõikelauale2(
it "
Link copiato negli appunti20
lt("&$
"Nuoroda nukopijuota į iškarpinę29
pt1"/-
+Link copiado para a área de transferência2(
eu "
Arbelean kopiatu da esteka2W
guO"MK
Iક્લિપબોર્ડ પર લિંક કૉપિ કરી2'
hu"
Link vágólapra másolva2M
ruE"CA
?Ссылка скопирована в буфер обмена.24
zu,"*(
&Isixhumanisi sikopishelwe ku-clipboard2-
lv%"#!
Saite ir kopēta starpliktuvē.2)
sv!"
Länk kopierad till Urklipp2.
iw&"$"
 הקישור הועתק ללוח26
sw.",*
(Imenakili kiungo kwenye ubao wa kunakili2H
hy@"><
:Հղումը պատճենվեց սեղմատախտակին2>
ky6"42
0Шилтеме буферге көчүрүлдү2s
myk"ig
eလင့်ခ်ကို ကလစ်ဘုတ်သို့ ကူးပြီးပါပြီ2&
az"
Link buferə kopyalandı2:
uz2"0.
,Havoladan vaqtinchalik xotiraga nusxa olindi2)
en-CA"
Link copied to clipboard23
fr-CA("&$
"Lien copié dans le presse-papiers2)
en-GB"
Link copied to clipboard2?
en-XC?"??
?‎‏‎‎‎‎‎‏‎‏‏‏‎‎‎‎‎‎‏‎‎‏‎‎‎‎‏‏‏‏‏‏‎‏‎‏‏‎‏‎‏‎‎‎‎‎‎‏‎‎‎‎‎‏‎‏‎‏‎‏‏‎‏‏‎‏‎‎‏‏‏‎‏‏‏‎‎‏‏‏‎‏‎‏‏‎‎‎‏‏‏‏‏‏‎‎Link copied to clipboard‎‏‎‎‏‎2,
zh-HK!"
連結已複製到剪貼簿2,
zh-CN!"
链接已复制到剪贴板2)
en-IN"
Link copied to clipboard2<
pt-BR1"/-
+Link copiado para a área de transferência26
es-US+")'
%Se copió el vínculo al portapapeles2=
pt-PT2"0.
,Link copiado para a área de transferência.2)
en-AU"
Link copied to clipboard2/
zh-TW$"" 
已將連結複製到剪貼簿*
fallbackType 2
 "

customtabs?
fallback_menu_item_copy_link 2
 "
	Copy link2
ca"
Copia l'enllaç2
da"
Kopiér link2
fa"
کپی پیوند2#
ja"
リンクをコピー29
ka1"/-
+ბმულის კოპირება21
pa)"'%
#ਲਿੰਕ ਕਾਪੀ ਕਰੋ26
ta.",*
(இணைப்பை நகலெடு2
nb"
Kopiér linken25
be-"+)
'Скапіраваць спасылку2
de"
Link kopieren2R
neJ"HF
Dलिंक प्रतिलिपि गर्नुहोस्2@
te8"64
2లింక్‌ను కాపీ చేయి2
af"
Kopieer skakel24
bg,"*(
&Копиране на връзката2/
th'"%#
!คัดลอกลิงก์2
fi"
Kopioi linkki24
hi,"*(
&लिंक कॉपी करें2C
si;"97
5සබැඳිය පිටපත් කරන්න2-
vi%"#!
Sao chép đường liên kết2-
kk%"#!
Сілтемені көшіру2.
mk&"$"
 Копирај го линкот2
sk"
Kopírovať odkaz23
uk+")'
%Копіювати посилання23
el+")'
%Αντιγραφή συνδέσμου2
gl"
Copiar ligazón29
ml1"/-
+ലിങ്ക് പകർത്തുക2
nl"
Link kopiëren2
pl"
Kopiuj link2
sl"
Kopiraj povezavo2
tl"
Kopyahin ang link2!
am"
አገናኝ ቅዳ2)
km!"
ចម្លង​តំណ24
bn,"*(
&লিঙ্ক কপি করুন2
in"

Salin link20
kn("&$
"ಲಿಂಕ್ ನಕಲಿಸಿ2-
mn%"#!
Холбоосыг хуулах2
ko"
링크 복사2,
lo$"" 
ສຳເນົາລິ້ງ2
ro"
Copiați linkul2
sq"
Kopjo lidhjen2!
ar"
نسخ الرابط2
fr"
Copier le lien2
hr"
Kopiraj vezu21
mr)"'%
#लिंक कॉपी करा2=
or5"31
/ଲିଙ୍କ୍ କପି କରନ୍ତୁ2%
sr"
Копирај линк2
	sr-Latn"
Kopiraj link2#
tr"
Bağlantıyı kopyala2&
ur"
لنک کاپی کریں2@
as8"64
2লিংক প্ৰতিলিপি কৰক2
bs"
Kopiraj link2
cs"
Kopírovat odkaz2
es"
Copiar enlace2
is"
Afrita tengil2
ms"
Salin pautan2
et"
Kopeeri link2
it"

Copia link2 
lt"
Kopijuoti nuorodą2
pt"
Copiar link2
eu"
Kopiatu esteka21
gu)"'%
#લિંક કૉપિ કરો2
hu"
Link másolása2/
ru'"%#
!Копировать ссылку2"
zu"
Kopisha isixhumanisi2
lv"
Kopēt saiti2
sv"
Kopiera länk2'
iw"
להעתקת הקישור2
sw"
Nakili kiungo2+
hy#"!
Պատճենել հղումը2/
ky'"%#
!Шилтемени көчүрүү2B
my:"86
4လင့်ခ်ကို ကူးယူရန်2
az"
Linki kopyalayın2#
uz"
Havoladan nusxa olish2
en-CA"
	Copy link2
fr-CA"
Copier le lien2
en-GB"
	Copy link2?
en-XC?"??
?‎‏‎‎‎‎‎‏‎‏‏‏‎‎‎‎‎‎‏‎‎‏‎‎‎‎‏‏‏‏‏‏‎‏‏‏‏‏‏‎‏‏‎‎‎‎‎‏‏‏‏‏‏‎‏‏‏‏‎‏‎‏‏‎‏‏‏‏‎‏‏‎‎‏‎‏‏‎‎‎‏‏‎‎‎‎‏‏‎‏‎‏‎‏‏‎Copy link‎‏‎‎‏‎2
zh-HK"
複製連結2
zh-CN"
复制链接2
en-IN"
	Copy link2
pt-BR"
Copiar link2 
es-US"
Copiar vínculo2
pt-PT"
Copiar link2
en-AU"
	Copy link2
zh-TW"
複製連結?!
"fallback_menu_item_open_in_browser 2
 "
Open in browser2
ca"
Obre al navegador2
da"
Åbn i browser2.
fa&"$"
 بازکردن در مرورگر2#
ja"
ブラウザで開く2<
ka4"20
.ბრაუზერში გახსნა2F
pa>"<:
8ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਖੋਲ੍ਹੋ23
ta+")'
%உலாவியில் திற2!
nb"
Åpne i nettleseren20
be("&$
"Адкрыць у браўзеры2 
de"
Im Browser öffnen2H
ne@"><
:ब्राउजरमा खोल्नुहोस्2?
te7"53
1బ్రౌజర్‌లో తెరువు2!
af"
Maak in blaaier oop20
bg("&$
"Отваряне в браузър2A
th9"75
3เปิดในเบราว์เซอร์2
fi"
Avaa selaimessa2@
hi8"64
2ब्राउज़र में खोलें2L
siD"B@
>බ්‍රව්සරයේ විවෘත කරන්න2'
vi"
Mở trong trình duyệt2)
kk!"
Браузерден ашу26
mk.",*
(Отвори во прелистувач2&
sk"
Otvoriť v prehliadači2?
uk7"53
1Відкрити у веб-переглядачі2I
elA"?=
;Άνοιγμα σε πρόγραμμα περιήγησης2 
gl"
Abrir no navegador2?
ml7"53
1ബ്രൗസറിൽ തുറക്കുക2
nl"
Openen in browser2&
pl"
Otwórz w przeglądarce2 
sl"
Odpri v brskalniku2
tl"
Buksan sa browser2.
am&"$"
 በአሳሽ ውስጥ ክፈት2?
km{"yw
uបើក​នៅក្នុង​កម្មវិធី​រុករកតាម​អ៊ីនធឺណិត29
bn1"/-
+ব্রাউজারে খুলুন2
in"
Buka di browser2N
knF"DB
@ಬ್ರೌಸರ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ2#
mn"
Хөтчид нээх2'
ko"
브라우저에서 열기2M
loE"CA
?ເປີດໃນໂປຣແກຣມທ່ອງເວັບ2%
ro"
Deschideți în browser2 
sq"
Hape në shfletues2(
ar "
فتح في المتصفح2'
fr"
Ouvrir dans un navigateur2"
hr"
Otvori u pregledniku2?
mr7"53
1ब्राउझरमध्ये उघडा2E
or=";9
7ବ୍ରାଉଜର୍‌ରେ ଖୋଲନ୍ତୁ22
sr*"(&
$Отвори у прегледачу2'
	sr-Latn"
Otvori u pregledaču2
tr"
Tarayıcıda aç2.
ur&"$"
 براؤزر میں کھولیں26
as.",*
(ব্ৰাউজাৰত খোলক2"
bs"
Otvori u pregledniku2(
cs "
Otevřít v prohlížeči2#
es"
Abrir en el navegador2
is"
Opna í vafra2'
ms"
Buka dalam penyemak imbas2
et"
Ava brauseris2
it"
Apri nel browser2$
lt"
Atidaryti naršyklėje2 
pt"
Abrir no navegador2!
eu"
Ireki arakatzailean29
gu1"/-
+બ્રાઉઝરમાં ખોલો2'
hu"
Megnyitás böngészőben20
ru("&$
"Открыть в браузере2 
zu"
Vula kusiphequluli2(
lv "
Atvērt pārlūkprogrammā2#
sv"
Öppna i webbläsaren2%
iw"
פתיחה בדפדפן2%
sw"
Fungua katika kivinjari2/
hy'"%#
!Բացել դիտարկիչում2+
ky#"!
Серепчиден ачуу2K
myC"A?
=ဘရောင်ဇာတွင် ဖွင့်ရန်2
az"
Brauzerdə açın2
uz"
Brauzerda ochish2 
en-CA"
Open in browser2*
fr-CA"
Ouvrir dans le navigateur2 
en-GB"
Open in browser2?
en-XC?"??
?‎‏‎‎‎‎‎‏‎‏‏‏‎‎‎‎‎‎‏‎‎‏‎‎‎‎‏‏‏‏‏‏‎‏‎‏‏‏‏‎‏‎‏‏‏‏‎‎‎‎‏‎‎‏‏‎‏‎‏‏‏‎‎‎‏‏‎‎‎‏‏‏‎‎‏‎‏‎‏‎‏‏‎‎‏‏‏‎‎‎‏‎‏‎‏‎Open in browser‎‏‎‎‏‎2&
zh-HK"
在瀏覽器中開啟2&
zh-CN"
在浏览器中打开2 
en-IN"
Open in browser2#
pt-BR"
Abrir no navegador2&
es-US"
Abrir en el navegador2#
pt-PT"
Abrir no navegador2 
en-AU"
Open in browser2&
zh-TW"
在瀏覽器中開啟?
fallback_menu_item_share_link 2
 "

Share link2"
ca"
Comparteix l'enllaç2
da"

Del link2*
fa"" 
هم‌رسانی پیوند2 
ja"
リンクの共有2<
ka4"20
.ბმულის გაზიარება24
pa,"*(
&ਲਿੰਕ ਸਾਂਝਾ ਕਰੋ29
ta1"/-
+இணைப்பைப் பகிர்2
nb"

Del link21
be)"'%
#Абагуліць спасылку2
de"
Link teilen2C
ne;"97
5लिंक सेयर गर्नुहोस्2@
te8"64
2లింక్‌ను షేర్ చేయి2
af"
Deel skakel26
bg.",*
(Споделяне на връзката2)
th!"
แชร์ลิงก์2
fi"

Jaa linkki24
hi,"*(
&लिंक शेयर करें2:
si2"0.
,සබැඳිය බෙදා ගන්න2#
vi"
Chia sẻ liên kết2-
kk%"#!
Сілтемені бөлісу2%
mk"
Сподели линк2
sk"
Zdieľať odkaz23
uk+")'
%Надіслати посилання27
el/"-+
)Κοινοποίηση συνδέσμου2 
gl"
Compartir ligazón29
ml1"/-
+ലിങ്ക് പങ്കിടുക2
nl"

Link delen2
pl"
Udostępnij link2
sl"
Deli povezavo2
tl"
Ibahagi ang link2$
am"
አገናኝ አጋራ2/
km'"%#
!តំណចែករំលែក2=
bn5"31
/লিঙ্ক শেয়ার করুন2
in"
Bagikan link20
kn("&$
"ಲಿಂಕ್ ಹಂಚಿರಿ23
mn+")'
%Холбоосыг хуваалцах2
ko"
링크 공유2/
lo'"%#
!ແບ່ງປັນລິ້ງ2
ro"
Trimiteți linkul2
sq"
Ndaj lidhjen2'
ar"
مشاركة الرابط2
fr"
Partager le lien2
hr"
Podijeli vezu21
mr)"'%
#लिंक शेअर करा2F
or>"<:
8ଲିଙ୍କ୍ ସେୟାର୍ କରନ୍ତୁ2
sr"
Дели линк2
	sr-Latn"
	Deli link2#
tr"
Bağlantıyı paylaş2/
ur'"%#
!لنک کا اشتراک کریں2=
as5"31
/লিংক শ্বেয়াৰ কৰক2
bs"
Dijeli link2
cs"
Sdílet odkaz2
es"
Compartir enlace2
is"
Deila tengli2
ms"
Kongsi pautan2
et"

Jaga linki2
it"
Condividi link2 
lt"
Bendrinti nuorodą2
pt"
Compartilhar link2
eu"
Partekatu esteka2.
gu&"$"
 લિંક શેર કરો2
hu"
Link megosztása2-
ru%"#!
Отправить ссылку2%
zu"
Yabelana ngesixhumanisi2
lv"
Kopīgot saiti2
sv"

Dela länk2'
iw"
לשיתוף הקישור2
sw"
Shiriki kiungo2)
hy!"
Կիսվել հղումով2/
ky'"%#
!Шилтемени бөлүшүү2B
my:"86
4လင့်ခ်ကို မျှဝေရန်2
az"
Linki paylaşın2
uz"
Havolani ulashish2
en-CA"

Share link2!
fr-CA"
Partager le lien2
en-GB"

Share link2?
en-XC?"??
?‎‏‎‎‎‎‎‏‎‏‏‏‎‎‎‎‎‎‏‎‎‏‎‎‎‎‏‏‏‏‏‏‏‏‏‎‎‎‏‏‎‎‏‎‏‎‎‏‏‎‏‏‏‎‎‎‎‏‎‎‏‏‎‏‎‏‎‎‎‏‏‏‏‎‏‏‎‏‎‏‎‎‏‏‏‏‏‎‎‎‎‎‎‏‎‎‎Share link‎‏‎‎‏‎2
zh-HK"
分享連結2
zh-CN"
分享链接2
en-IN"

Share link2"
pt-BR"
Compartilhar link2#
es-US"
Compartir vínculo2
pt-PT"
Partilhar link2
en-AU"

Share link2
zh-TW"
分享連結.
generatorApp 2
 "
bubblewrap-cli6
	hostName 2$
  "
twa-sample-cros-sa.web.app@

	launchUrl 2-
 )"'%
#https://twa-sample-cros-sa.web.app/(
launcherName 2
 "

Web PlayN
manage_space_no_data_toast 2*
 &"$"
 This app holds no browsing data.V
 manage_space_not_supported_toast 2,
 ("&$
"This app's data is stored in %1$s.N
no_provider_toast 23
 /"-+
)Please install Chrome Stable 72 or later.&
orientation 2
 "	
defaultP
providerAuthority 25
 1"/-
+app.web.twa_sample_cros_sa.twa.fileprovider?
%status_bar_notification_info_overflow 2
 
"
999+2
ca
"
999+2
da
"
999+2
fa
"
999+2
ja
"
999+2
ka
"
999+2
pa
"
999+2
ta
"
999+2
nb
"
999+2
be
"
999+2
de
"
999+2
ne"

९९९+2
te
"
999+2
af
"
999+2
bg
"
999+2
th
"
999+2
fi
"
999+2
hi
"
999+2
si
"
999+2
vi
"
999+2
kk
"
999+2
mk
"
999+2
sk
"
999+2
uk
"
999+2
el
"
999+2
gl
"
>9992
ml
"
999+2
nl
"
999+2
pl
"
999+2
sl
"
999+2
tl
"
999+2
am
"
999+2
km
"
999+2
bn"

৯৯৯+2
in
"
999+2
kn
"
999+2
mn
"
999+2
ko
"
999+2
lo
"
999+2
ro
"
999+2
sq
"
999+2
ar
"
999+2
fr
"
999+2
hr
"
999+2
mr"

९९९+2
or
"
999+2
sr
"
999+2
	sr-Latn
"
999+2
tr
"
999+2
ur
"
+9992
as"

৯৯৯+2
bs
"
999+2
cs
"
999+2
es
"
999+2
is
"
999+2
ms
"
999+2
et
"
999+2
it
"
999+2
lt
"
999+2
pt
"
999+2
eu
"
999+2
gu
"
999+2
hu
"
999+2
ru
"
>9992
zu
"
999+2
lv
"
999+2
sv
"
999+2
iw
"
999+2
sw
"
999+2
hy
"
999+2
ky
"
999+2
my"

၉၉၉+2
az
"
999+2
uz
"
999+2
en-CA
"
999+2
fr-CA
"
999+2
en-GB
"
999+2?
en-XC?"??
?‎‏‎‎‎‎‎‏‎‏‏‏‎‎‎‎‎‏‎‎‏‎‎‎‎‏‏‏‏‏‏‏‏‏‎‏‏‏‎‏‏‎‏‏‏‎‏‏‎‎‎‎‏‎‏‎‎‎‏‏‏‏‏‎‏‏‏‎‏‎‏‎‏‏‏‎‎‏‎‏‏‏‎‏‏‏‏‏‏‏‎‎‎‏‏‎999+‎‏‎‎‏‎2
zh-HK
"
999+2
zh-CN
"
999+2
en-IN
"
999+2
pt-BR
"
999+2
es-US
"
999+2
pt-PT
"
999+2
en-AU
"
999+2
zh-TW
"
999+R
update_chrome_toast 25
 1"/-
+Please update to Chrome Stable 72 or later.R
webManifestUrl 2:
 6"42
0https://twa-sample-cros-sa.web.app/manifest.json?
style?
 "TextAppearance.Compat.Notification 2D
 @*><
:瀌3android:style/TextAppearance.StatusBar.EventContent2F
??*=;
9???2android:style/TextAppearance.Material.Notification?
'TextAppearance.Compat.Notification.Info 2?
 ?*??
0????(style/TextAppearance.Compat.Notification%???android:attr/textSize":h?K???android:attr/textColor"*
(???android:attr/textColorSecondary2K
?D*B@
>???7android:style/TextAppearance.Material.Notification.Infoq
(TextAppearance.Compat.Notification.Line2 2?
 ;*97
5????-style/TextAppearance.Compat.Notification.Info?
'TextAppearance.Compat.Notification.Time 2?
 ?*??
0????(style/TextAppearance.Compat.Notification%???android:attr/textSize":h?K???android:attr/textColor"*
(???android:attr/textColorSecondary2K
?D*B@
>???7android:style/TextAppearance.Material.Notification.Time?
(TextAppearance.Compat.Notification.Title 2J
 F*DB
@而9android:style/TextAppearance.StatusBar.EventContent.Title2L
?E*CA
????8android:style/TextAppearance.Material.Notification.Title?
)Widget.Compat.NotificationActionContainer 2
 * 2`
?Y*WUSԁ?android:attr/background"1
/????'drawable/notification_action_background?
$Widget.Compat.NotificationActionText 2
 * 2?
??*??R"???android:attr/textAppearance",
*???!android:attr/textAppearanceButtonV???android:attr/textColor"5
3????+color/secondary_text_default_material_lightM???android:attr/textSize"-
+????#dimen/notification_action_text_size?&
	styleable?
 ColorStateListItem2?
 ?*??
7Base color for this state.???android:attr/color
A+Alpha multiplier applied to the base color.????
attr/alpha
???android:attr/alpha?

FontFamily2?
 ?*??
d>The authority of the Font Provider to be used for the request."????attr/fontProviderAuthority
?zThe package for the Font Provider to be used for the request. This is used to verify
        the identity of the provider. ????attr/fontProviderPackage
?|The query to be sent over to the provider. Refer to your font provider's documentation
        on the format of this string.????attr/fontProviderQuery
??The sets of hashes for the certificates the provider should be signed with. This is
        used to verify the identity of the provider, and is only required if the provider is not
        part of the system image. This value may point to one list or a list of lists, where each
        individual list represents one collection of signature hashes. Refer to your font provider's
        documentation for these values.????attr/fontProviderCerts
??The strategy to be used when fetching font data from a font provider in XML layouts.
        This attribute is ignored when the resource is loaded from code, as it is equivalent to the
        choice of API between {@link
    androidx.core.content.res.ResourcesCompat#getFont(Context, int)} (blocking) and
        {@link
    androidx.core.content.res.ResourcesCompat#getFont(Context, int, FontCallback, Handler)}
        (async).&????attr/fontProviderFetchStrategy
S*The length of the timeout during fetching.%????attr/fontProviderFetchTimeout?
FontFamilyFont2?
 ?*??
??The style of the given font file. This will be used when the font is being loaded into
         the font stack and will override any style information in the font's header tables. If
         unspecified, the value in the font's header tables will be used.????attr/fontStyle
??The reference to the font file to be used. This should be a file in the res/font folder
         and should therefore have an R reference value. E.g. @font/myfont????	attr/font
??The weight of the given font file. This will be used when the font is being loaded into
         the font stack and will override any weight information in the font's header tables. Must
         be a positive number, a multiple of 100, and between 100 and 900, inclusive. The most
         common values are 400 for regular weight and 700 for bold weight. If unspecified, the value
         in the font's header tables will be used.????attr/fontWeight
??The variation settings to be applied to the font. The string should be in the following
         format: "'tag1' value1, 'tag2' value2, ...". If the default variation settings should be
         used, or the font used does not support variation settings, this attribute needs not be
         specified."????attr/fontVariationSettings
??The index of the font in the tcc font file. If the font file referenced is not in the
        tcc format, this attribute needs not be specified.????attr/ttcIndex
B!References to the framework attrs???android:attr/fontStyle
???android:attr/font
 ???android:attr/fontWeight
+)???"android:attr/fontVariationSettings
android:attr/ttcIndex?

GradientColor2?	
 ?	*?	?	
>Start color of the gradient.???android:attr/startColor
9Optional center color.???android:attr/centerColor
:End color of the gradient.???android:attr/endColor
I-Type of gradient. The default type is linear.???android:attr/type
]7Radius of the gradient, used only with radial gradient."???android:attr/gradientRadius
Z;X coordinate of the center of the gradient within the path.???android:attr/centerX
Z;Y coordinate of the center of the gradient within the path.???android:attr/centerY
?sX coordinate of the start point origin of the gradient.
             Defined in same coordinates as the path itself???android:attr/startX
?}Y coordinate of the start point of the gradient within the shape.
             Defined in same coordinates as the path itself???android:attr/startY
?qX coordinate of the end point origin of the gradient.
             Defined in same coordinates as the path itself???android:attr/endX
?{Y coordinate of the end point of the gradient within the shape.
             Defined in same coordinates as the path itself???android:attr/endY
lLDefines the tile mode of the gradient. SweepGradient doesn't support tiling.???android:attr/tileMode?
GradientColorItem2?
 ?*??
??The offset (or ratio) of this current color item inside the gradient.
             The value is only meaningful when it is between 0 and 1.???android:attr/offset
R5The current color for the offset inside the gradient.???android:attr/color?
xml2
 	filepaths 2!
 "*
res/xml/filepaths.xmlL
image_share_filepaths 2-
 )"'*%
!res/xml/image_share_filepaths.xml4
	shortcuts 2!
 "*
res/xml/shortcuts.xml"3
#Android Asset Packaging Tool (aapt)2.19-6503028