---
layout : post
title : "Android安全模式机制之基础一(现代安全体系基础概念)"
category : Android
duoshuo: true
date : 2014-10-25
tags : [Android安全模式机制 , 对称加密,非对称加密,密钥交换,消息摘要,电子签名,证书与PKI]
SyntaxHihglighter: true
shTheme: shThemeMidnight # shThemeDefault  shThemeDjango  shThemeEclipse  shThemeEmacs  shThemeFadeToGrey  shThemeMidnight  shThemeRDark
---

<style>
h3 {
    line-height: 1.5;
    letter-spacing: 2px;
    margin-top: -10px;
}
h6 {
    line-height: 1.5;
    letter-spacing: 2px;
    margin-top: -10px;
}
</style>

目录:

* ###1.典型的加密模型
* ###2.对称秘钥算法 (加密解密密钥相同)
* ###3.非对称密钥算法(公钥密码)(加密与解密密钥不同.)
* ###4.密钥交换
* ###5.消息摘要
* ###6.电子签名
* ###7.证书与PKI


**1.典型的加密模型**  

	密钥:分为加密密钥和解密密钥
	明文:没有进行加密,能够直接代表原文含义的信息.
	密文:经这加密处理之后,隐藏原温含义的信息
	解密:将密文转换成明文的实施过程.

	明文P-->加密方法E --> 密文 --> 解密方法D --> 明文P
	        加密密钥K  密文P=Ek(p)  解密密钥K'
	
		Dk'(Ek(P))=P    k=k'则为对称加密

<!-- more -->
	
**2.对称秘钥算法 (加密解密密钥相同)**

	优缺点:
		优点: 高效
		缺点: 密钥交换的问题
		      不如RSA的加密安全程度高,但是当选择256bit的AES,扔然能胜任大多数的安全领域.
 
	置换加密如:

		abcdefghijklmnopqrstuvwxyz
		istjkqrzlyefuvmnopgwxhabcd

		hello --> zkffm

		the key is the mapping list: istjkqrzlyefuvmnopgwxhabcd

	转置加密如:

		i am a boy you are a girl

		143526

		iamabo
		yyouar
		eagirl

		---->
		iye
		bar
		mog
		aya
		aui
		orl

		the key is the column order: 143526

	乘积密码如:(重复迭代,置换加密与转置加密.)
		iamabo
		yyouar
		eagirl
		---->
		liuism
		ccmxip
		kirlpf
		---->
		lck
		sip
		umr
		ici
		ixl
		mpf

		the key is istjkqrzlyefuvmnopgwxhabcd 143526

	DES 数据加密标准(data encryption standard)

	AES 高级加密标准(Advanced Encryption Standard)

**3.非对称密钥算法(公钥密码)(加密与解密密钥不同.)**

	明文P-->加密方法E --> 密文 --> 解密方法D --> 明文P
	        加密密钥K  密文P=Ek(p)  解密密钥K'
	
		Dk'(Ek(P))=P    k!=k'则为非对称加密 (K公钥,K'私钥)(publicKey 公钥,privateKey 私钥)

	公钥算法的理论基石
		数学的科学之基
		基础学科研究之物, 虚虚实实,先虚后实
		公开密钥算法的最重要两大数学基础
		/建立在分解大数的困难度{如: RSA算法(公钥/私钥长度,至少1024bit)}
		/建立在以大素数为模来计算离散对数的困难度.
	
	优缺点:
		优点:安全性足够高(相比对称加密)
		     没有密钥交换的问题
		缺点:效率低,对于大数据加密很慢

**4.密钥交换**

	实际的保密会话应用场景
		1.基于高效的对称加密算法对会话进行加密
		2.会话密钥实时产生且周期性变化
		3.基于其它足够安全的方式进行会话密钥的传输与交换.

	利用公钥密码来交换会话密钥.
		1.实时随机的会话密钥产生
		2.使用对端的公钥对产生的会话密钥加密并传递给对端
		3.对端使用私钥解密获取会话密钥
		4.双方开始基于共享的会话密钥进行对称加密的保密会话通信.
	
	Diffie-Hellman密钥交换协议
		1.基于对大素数为模计算离散对数的困难度
		2.双方各自选定key,然后以一定算法变换(使得key不以明文传输)后传输给对方
		3.双方利用对方交换来的数据和自己选定的key做变换,获得一个一致的结果,作为会话密钥.

**5.消息摘要**
	
	HASH与散列函数的定义与特点
		HASH翻译成散列或者哈希
		HASH(散列)函数(算法)的定义是:变长的输入变换成定长的输出
		常见的HASH算法:MD5(128bit),SHA1(160bit)
		HASH的特点:
			1.易变性:即便原始信息发生1bit的变化,HASH的输出将会有不可预知的巨大变化.
			2.不可逆:通过HASH的结果构造出满足的输入信息是不可能的或者及其困难的.
			与人的指纹相对应
				1.双胞胎的指纹不同
				2.通过指纹猜不出它的主人
			数字指纹由此而来
			消息摘要: 摘要窥/定全体
			HASH , 哈希 , 散列 , MD , 消息摘要 , 数字指纹 都是一个意思.

	HASH的应用场景:防篡改. 防损坏 . 认证
	
	HMAC : Hash-based Mesage Authentication Code (消息认证码)
		我们遇到了什么问题
			1.直接尾部附带消息摘要的问题(篡改内容的同时篡改摘要)
			2.直接对密码做HASH传输的认证的问题(重放攻击)
		HMAC怎么解决的
			HMAC就是使用key对原始消息变换后再进行HASH.

**6.电子签名**
	
	公钥密码术的两面性(非对称密钥算法的两面性)
		1.应用于保密通信场景
			DprivateKey(EpublicKey(P)) = P  (说明:使用公钥加密P,使用私钥解密出P)

		2.应用于电子签名场景
			DpublicKey(EprivateKey(P)) = P  (说明:使用私钥加密P,使用公钥解密出P  ---- 电子签名)
			并非所有公钥密码术都支持,RSA支持

	HASH+公钥密码术:成就电子签名
		1.RSA的低效率特性,导致即便是签名也不适合直接对原始信息进行签名 
		2.利用HASH先完成消息摘要和完整性鉴别的作用. 
		3.而后对简单的消息摘要进行基于公钥密码术的签名 
		4.签名一般附着于原始消息尾部或者头部一起发送 

					原始消息P
					MD = HASH(P)
		原始消息P + Signature = EprivateKey(MD) ---> Target

		假如原数据P有1G,加密效率低,把原数据1G的数据P获取HASH值,
		用私钥加密1G数据P的HASH值得到签名signature,发送数据的时候把1G数据P+签名signature

**7.证书与PKI**

	证书的作用: 公钥的存储和交换
		公钥作为一个字段存储于数字证书中
		证书的交换和传输即可传输/交换公钥
		利用签名来保护数字证书本身

		数字时代的信任关系: 一个受信任者的证书列表
	
	证书链和PKI
		数字时代的信任链: 证书链
		证书签名的不同点: 根证书自签名, 非根证书父签名
		证书的限制:
			约束
			用途
			有效期
		PKI 公钥基础设施（Public Key Infrastructure）		

	基于证书的认证
		基于可信任证书的认证方式被广泛的应用在现代安娜依斯领域,比如WIFI,HTTPS
		在HTTPS中,典型的Client对Server的认证和鉴别基于可信任列表

	



