---
layout : post
title : "Java实现加密算法"
category : Java
duoshuo: true
date : 2014-12-01
tags : [Java,Base64,AES,CRC,DES,DH,DSA,ECDSA,ElGamal,HMAC,IDEA,MD,PBE,RSA,SHA,加密,解密]
SyntaxHihglighter: true
shTheme: shThemeMidnight # shThemeDefault  shThemeDjango  shThemeEclipse  shThemeEmacs  shThemeFadeToGrey  shThemeMidnight  shThemeRDark
---

目录:

	Base64
	消息摘要算法
		MD
		SHA
		MAC
	对称加密算法
		DES
		3DES
		AES
		PBE
	非对称加密算法
		DH
		RSA
		ElGamal
	数字签名算法
		RSA
		DSA
		ECDSA
	其它算法
		IDEA
		CRC

<!-- more -->

Base64

<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	public static void jdkBase64(String msg) {
		try {
			BASE64Encoder encoder = new BASE64Encoder();
			String encode = encoder.encode(msg.getBytes());
			System.out.println("encode:" + encode);
			
			BASE64Decoder decoder = new BASE64Decoder();
			byte[] b = decoder.decodeBuffer(encode);
			System.out.println("decoder:" + new String(b));
		} catch (Exception e) {
		}
	}

	public static void commonsCodesBase64(String msg) {
		byte[] encodeBytes = org.apache.commons.codec.binary.Base64.encodeBase64(msg.getBytes());
		System.out.println("encode:" + new String(encodeBytes));

		byte[] decodeBytes = org.apache.commons.codec.binary.Base64.decodeBase64(encodeBytes);
		System.out.println("decode:" + new String(decodeBytes));
	}
	
	public static void bouncyCastleBase64(String msg) {
		byte[] encodeBytes = org.bouncycastle.util.encoders.Base64.encode(msg.getBytes());
		System.out.println("encode:" + new String(encodeBytes));
		
		byte[] decodeBytes = org.bouncycastle.util.encoders.Base64.decode(encodeBytes);
		System.out.println("decode:" + new String(decodeBytes));
	}
</pre>


**消息摘要算法 - MD**
 
	 算法:
	 MD2  实现方:JDK
	 MD4  实现方:BouncyCastle 简称BC
	 MD5  实现方:JDK


<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	public static void jdkMD2(String msg) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD2");
			byte[] md2Bytes = md.digest(msg.getBytes());
			System.out.println("JDK MD2:" + org.apache.commons.codec.binary.Hex.encodeHexString(md2Bytes));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void jdkMD5(String msg) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			byte[] md5Bytes = md.digest(msg.getBytes());
			System.out.println("JDK MD5:" + org.apache.commons.codec.binary.Hex.encodeHexString(md5Bytes));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// BouncyCastle
	public static void bcMD4(String msg) {
		try {
			Security.addProvider(new BouncyCastleProvider());// 为JDK设置算法
			MessageDigest md = MessageDigest.getInstance("MD4");
			byte[] md4Bytes = md.digest(msg.getBytes());
			System.out.println("JDK MD5:" + org.apache.commons.codec.binary.Hex.encodeHexString(md4Bytes));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}

		Digest digest = new MD4Digest();
		digest.update(msg.getBytes(), 0, msg.getBytes().length);
		byte[] md4Byte = new byte[digest.getDigestSize()];
		digest.doFinal(md4Byte, 0);
		System.out.println("BC MD4: " + org.bouncycastle.util.encoders.Hex.toHexString(md4Byte));
	}

	// BouncyCastle
	public static void bcMD5(String msg) {
		Digest digest = new MD5Digest();
		digest.update(msg.getBytes(), 0, msg.getBytes().length);
		byte[] md5Byte = new byte[digest.getDigestSize()];
		digest.doFinal(md5Byte, 0);
		System.out.println("BC MD5: " + org.bouncycastle.util.encoders.Hex.toHexString(md5Byte));
	}
	
	//commons codec
	public static void ccMD5(String msg){
		System.out.println("CC MD5:"+DigestUtils.md5Hex(msg.getBytes()));
	}
	//commons codec
	public static void ccMD2(String msg){
		System.out.println("CC MD2:"+DigestUtils.md2Hex(msg.getBytes()));
	}

	//-----------------
	public static final String MD5_TYPE_16 = "t_16";
	public static final String MD5_TYPE_32 = "T_32";

	public static String md5s(String plainText, String type) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(plainText.getBytes());
			byte b[] = md.digest();

			int i;

			StringBuffer buf = new StringBuffer("");
			for (int offset = 0; offset < b.length; offset++) {
				i = b[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buf.append("0");
				buf.append(Integer.toHexString(i));
			}
			String str = buf.toString();

			if (type.equals(MD5_TYPE_16)) {
				str = str.substring(8, 24);
			}

			return str;
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}

</pre>

**消息摘要算法 - SHA**

	安全散列算法
	固定长度摘要信息
	SHA-1  SHA-2(SHA-224,SHA-256,SHA-384,SHA-512)

	算法:
	SHA-1    实现方:JDK
	SHA-224  实现方:BC
	SHA-256  实现方:JDK
	SHA-384  实现方:JDK
	SHA-512  实现方:JDK


<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">

	public static void jdkSHA1(String msg) {
		try {
			MessageDigest md = MessageDigest.getInstance("SHA");// SHA1
			md.update(msg.getBytes());
			System.out.println("jdk SHA-1:" + Hex.encodeHexString(md.digest()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
	}

	public static void bcSHA1(String msg) {
		Digest digest = new SHA1Digest();
		digest.update(msg.getBytes(), 0, msg.getBytes().length);
		byte[] sha1Byte = new byte[digest.getDigestSize()];
		digest.doFinal(sha1Byte, 0);
		System.out.println("bc SHA-1:" + org.bouncycastle.util.encoders.Hex.toHexString(sha1Byte));
	}

	public static void bcSHA224(String msg) {
		Digest digest = new SHA224Digest();
		digest.update(msg.getBytes(), 0, msg.getBytes().length);
		byte[] sha224Byte = new byte[digest.getDigestSize()];
		digest.doFinal(sha224Byte, 0);
		System.out.println("bc SHA-224:" + org.bouncycastle.util.encoders.Hex.toHexString(sha224Byte));
	}

	public static void jdkSHA224_2(String msg) {
		try {
			Security.addProvider(new BouncyCastleProvider());// 设置
			MessageDigest md = MessageDigest.getInstance("SHA224");// SHA224
			md.update(msg.getBytes());
			System.out.println("jdk addProvider ->SHA-224:" + Hex.encodeHexString(md.digest()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
	}

	public static void ccSHA1(String msg) {
		System.out.println("cc sha1:" + DigestUtils.sha1Hex(msg.getBytes()));
		System.out.println("cc sha512:" + DigestUtils.sha512Hex((msg.getBytes())));
	}

</pre>

**消息摘要算法 - MAC**
 
	 MAC(Message Authentication Code)
	 HMAC(keyed-Hash Message Authentication Code),含有密钥的散列函数算法
	 任何MD,SHA
	  -MD系列:HmacMD2 , HmacMD4 , HmacMD5
	  -SHA系列: HmacSHA1, HmacSHA224,HmacSHA256,HmacSHA384,HmacSHA512
	  
	  算法:
	  HmacMD2    实现方:BC
	  HmacMD4    实现方:BC
	  HmacMD5    实现方:JDK
	  HamcSHA1   实现方:JKD
	  HmacSHA224 实现方:BC
	  HmacSHA256 实现方:JKD
	  HmacSHA384 实现方:JKD
	  HmacSHA512 实现方:JKD
	  
	  
	  
	  其它消息摘要算法
	  RipeMD
	  Tiger
	  Whirlpool
	  GOST3411
	  
	  Bouncy Castle实现


<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	public static void jdkHmacMD5(String msg, String keyParameter) {
		try {
			KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacMD5");
			SecretKey secretKey = keyGenerator.generateKey();// 产生密钥
			byte[] key = secretKey.getEncoded();// 获取密钥

			key = Hex.decodeHex(keyParameter.toCharArray());//

			// 还原密钥
			SecretKey restoreSecretKey = new SecretKeySpec(key, "HmacMD5");
			Mac mac = Mac.getInstance(restoreSecretKey.getAlgorithm());// 实例化MAC
			mac.init(restoreSecretKey);
			byte[] hmacMD5Bytes = mac.doFinal(msg.getBytes());// 执行摘要
			System.out.println("jdk hmacMD5:" + Hex.encodeHexString(hmacMD5Bytes));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void bcHmacMD5(String msg, String keyParameter) {
		HMac hmac = new HMac(new MD5Digest());

		byte[] b = org.bouncycastle.util.encoders.Hex.decode(keyParameter.getBytes());
		KeyParameter k = new KeyParameter(b);
		hmac.init(k);
		hmac.update(msg.getBytes(), 0, msg.getBytes().length);

		byte[] hmacMD5Bytes = new byte[hmac.getMacSize()];
		hmac.doFinal(hmacMD5Bytes, 0);

		System.out.println("bc hmacMD5:" + org.bouncycastle.util.encoders.Hex.toHexString(hmacMD5Bytes));
	}
</pre>


**对称加密算法 - DEC - 3DEC**

	 初等
	 DES
		-3DES
	 AES
	 PBE
	 IDEA
	 
	 DES(Data Encryptiong Standard) 数据加密标准
	 对称加密元老.
	 
	 密钥长度56  默认56  工作模式:ECB,CBC,PCBC,CTR,CTS,CFB,CFB8,到128,OFB,OFB8到128 
	 实现方:JDK 填充方式:NoPadding,PKCS5Padding,ISO10126Padding, 
	 实现方:BC 填充方式:PKCS7Padding,ISO10126d2Padding,X932Padding,ISO7816d4Pading,ZeroBytePading
	 
	 3DES(Triple DES或者DESede)
	 密钥长度112,168  默认168 
	 密钥长度128,192  默认168

<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	public static void jdkDES(String src) {
		try {
			// 生成KEY
			KeyGenerator keyGenerator = KeyGenerator.getInstance("DES");
			keyGenerator.init(56);
			SecretKey secretKey = keyGenerator.generateKey();
			byte[] bytesKey = secretKey.getEncoded();

			// KEY转换
			DESKeySpec desKeySpec = new DESKeySpec(bytesKey);
			SecretKeyFactory factory = SecretKeyFactory.getInstance("DES");
			Key convertSecretKey = factory.generateSecret(desKeySpec);

			// 加密
			Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, convertSecretKey);
			byte[] result = cipher.doFinal(src.getBytes());
			System.out.println("jdk des encrypt : " + Hex.encodeHexString(result));

			// 解密
			cipher.init(Cipher.DECRYPT_MODE, convertSecretKey);
			result = cipher.doFinal(result);
			System.out.println("jdk des decrypt : " + new String(result));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void bcDES(String src) {
		try {
			Security.addProvider(new BouncyCastleProvider());

			// 生成KEY
			KeyGenerator keyGenerator = KeyGenerator.getInstance("DES", "BC");
			keyGenerator.getProvider();
			keyGenerator.init(56);
			SecretKey secretKey = keyGenerator.generateKey();
			byte[] bytesKey = secretKey.getEncoded();

			// KEY转换
			DESKeySpec desKeySpec = new DESKeySpec(bytesKey);
			SecretKeyFactory factory = SecretKeyFactory.getInstance("DES");
			Key convertSecretKey = factory.generateSecret(desKeySpec);

			// 加密
			Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, convertSecretKey);
			byte[] result = cipher.doFinal(src.getBytes());
			System.out.println("bc des encrypt : " + Hex.encodeHexString(result));

			// 解密
			cipher.init(Cipher.DECRYPT_MODE, convertSecretKey);
			result = cipher.doFinal(result);
			System.out.println("bc des decrypt : " + new String(result));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void jdk3DES(String src) {
		try {
			// 生成KEY
			KeyGenerator keyGenerator = KeyGenerator.getInstance("DESede");
			// keyGenerator.init(168);
			keyGenerator.init(new SecureRandom());// 默认长度
			SecretKey secretKey = keyGenerator.generateKey();
			byte[] bytesKey = secretKey.getEncoded();

			// KEY转换
			DESKeySpec desKeySpec = new DESKeySpec(bytesKey);
			SecretKeyFactory factory = SecretKeyFactory.getInstance("DES");
			Key convertSecretKey = factory.generateSecret(desKeySpec);

			// 加密
			Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, convertSecretKey);
			byte[] result = cipher.doFinal(src.getBytes());
			System.out.println("jdk 3des encrypt : " + Base64.encodeBase64String(result));

			// 解密
			cipher.init(Cipher.DECRYPT_MODE, convertSecretKey);
			result = cipher.doFinal(result);
			System.out.println("jdk 3des decrypt : " + new String(result));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
</pre>


**对称加密算法 - AES**

	 DES替代者
	 
	 密钥长度:128,192,256 默认128 工作模式:ECB,CBC,PCBC,CTR,CTS,CFB,CFB8到128,OFB,OFB8到128 
	 填充方式:NoPadding,PKCS5Padding,ISO10126Padding 实现方:JDK(256位密钥需要获得无政策限制权限文件)
	 填充方式:PKCS7Padding,ZeroBytePadding 实现方:BC
	 
	 无政策限制权限文件是指,因为某些国家的进口管制限制,Java发布的远行环境包中的加解密有一定的限制

<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	public static void jdkAES(String src) {
		try {
			// 生成KEY
			KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
			keyGenerator.init(128);
			SecretKey secretKey = keyGenerator.generateKey();
			byte[] keyBytes = secretKey.getEncoded();

			// key转换
			Key key = new SecretKeySpec(keyBytes, "AES");

			// 加密
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, key);
			byte[] result = cipher.doFinal(src.getBytes());
			System.out.println("jdk aes encrypt : " + Base64.encodeBase64String(result));

			// 解密
			cipher.init(Cipher.DECRYPT_MODE, key);
			result = cipher.doFinal(result);
			System.out.println("jdk aes desrypt : " + new String(result));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
</pre>


**对称加密算法 - PBE**

	PBE(Password Based Encryption)基于口令加密

	算法                         密钥长度    默认  工作模式       填充方式      实现
	PBEWithMD5AndDES                64       64      CBC       PKCS5Padding       BC
	PBEWithMd5AndRC2                112      128               PKCS7Padding
	PBEWithSHA1AndDES               6        64                ISO10126Padding
	PBEWithSHAAndIDEA-CBC           128      128
	PBEWithSHAAnd2-KeyTripleDES-CBC 128      128
	PBEWithSHAAnd3-KeyTripleDES-CBC 192      192

<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">

	public static void jdkPBE(String src) {
		try {
			// 初始化盐
			SecureRandom random = new SecureRandom();
			byte[] salt = random.generateSeed(8);

			// 口令与密钥
			String password = "password_comtu";
			PBEKeySpec pbeKeySpec = new PBEKeySpec(password.toCharArray());
			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBEWITHMD5andDES");
			Key key = factory.generateSecret(pbeKeySpec);

			// 加密
			PBEParameterSpec pbeParameterSpec = new PBEParameterSpec(salt, 100);
			Cipher cipher = Cipher.getInstance("PBEWITHMD5andDES");
			cipher.init(Cipher.ENCRYPT_MODE, key, pbeParameterSpec);
			byte[] result = cipher.doFinal(src.getBytes());
			System.out.println("jdk pbe encrypt : " + Base64.encodeBase64String(result));

			// 解密
			cipher.init(Cipher.DECRYPT_MODE, key, pbeParameterSpec);
			result = cipher.doFinal(result);
			System.out.println("jdk pbe decrypt : " + new String(result));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

</pre>


**非对称加密算法 - DH**
	
	高级 
	双保险 
	公钥,私钥
 
	  DH(Diffie-Hellman)密钥交换算法
	  RSA-基于因子分解 ElGamal - 基于离散对数 
	  ECC(Elliptical Curve Cryptography) - 椭圆曲线加密
 
 
	DH 密钥长度: 512~1024(64倍数) 默认1024 实现方:JDK
 
<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	public static void jdkDH(String src) {
		try {
			// 1.初始化发送方密钥
			KeyPairGenerator senderKeyPairGenerator = KeyPairGenerator.getInstance("DH");
			senderKeyPairGenerator.initialize(512);
			KeyPair senderKeyPair = senderKeyPairGenerator.generateKeyPair();
			byte[] senderPublicKeyEnc = senderKeyPair.getPublic().getEncoded();// 发送方公钥，发送给接收方（网络、文件。。。）

			// 2.初始化接收方密钥
			KeyFactory receiverKeyFactory = KeyFactory.getInstance("DH");
			X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(senderPublicKeyEnc);
			PublicKey receiverPublicKey = receiverKeyFactory.generatePublic(x509EncodedKeySpec);
			DHParameterSpec dhParameterSpec = ((DHPublicKey) receiverPublicKey).getParams();
			KeyPairGenerator receiverKeyPairGenerator = KeyPairGenerator.getInstance("DH");
			receiverKeyPairGenerator.initialize(dhParameterSpec);
			KeyPair receiverKeypair = receiverKeyPairGenerator.generateKeyPair();
			PrivateKey receiverPrivateKey = receiverKeypair.getPrivate();
			byte[] receiverPublicKeyEnc = receiverKeypair.getPublic().getEncoded();

			// 3.密钥构建
			KeyAgreement receiverKeyAgreement = KeyAgreement.getInstance("DH");
			receiverKeyAgreement.init(receiverPrivateKey);
			receiverKeyAgreement.doPhase(receiverPublicKey, true);
			SecretKey receiverDesKey = receiverKeyAgreement.generateSecret("DES");

			KeyFactory senderKeyFactory = KeyFactory.getInstance("DH");
			x509EncodedKeySpec = new X509EncodedKeySpec(receiverPublicKeyEnc);
			PublicKey senderPublicKey = senderKeyFactory.generatePublic(x509EncodedKeySpec);
			KeyAgreement senderKeyAgreement = KeyAgreement.getInstance("DH");
			senderKeyAgreement.init(senderKeyPair.getPrivate());
			senderKeyAgreement.doPhase(senderPublicKey, true);
			SecretKey senderDesKey = senderKeyAgreement.generateSecret("DES");

			// if (com.sun.org.apache.xalan.internal.utils.Objects.equals(receiverDesKey, senderDesKey)) {
			if (receiverDesKey.equals(senderDesKey)) {
				System.out.println("双方密钥相同");
			} else {
				System.out.println("双方密钥不同");
			}

			// 4.加密
			Cipher cipher = Cipher.getInstance("DES");
			cipher.init(Cipher.ENCRYPT_MODE, senderDesKey);
			byte[] result = cipher.doFinal(src.getBytes());
			System.out.println("jdk dh encrypt : " + Base64.encodeBase64String(result));

			// 5.解密
			cipher.init(Cipher.DECRYPT_MODE, receiverDesKey);
			result = cipher.doFinal(result);
			System.out.println("jdk dh decrypt : " + new String(result));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
</pre>



**非对称加密算法 - 数字签名算法 - RSA**

	经典算法 
	MD,SHA两类

	算法:
	MD2withRSA       实现方: JDK
	MD5withRSA       实现方: JDK
	SHA1withRSA      实现方: JDK
	SHA224withRSA    实现方: BC
	SHA256withRSA    实现方: BC
	SHA384withRSA    实现方: BC
	SHA512withRSA    实现方: BC
	RIPEMD128withRSA 实现方: BC
	RIPEMD160withRSA 实现方: BC


	非对称加密算法-RSA
	唯一广泛接受并实现
	数据加密&数字签名
	公钥加密,私钥解密
	私钥加密,公钥解密

	JDK 密钥长度:512~65536(64整数倍) 工作模式:ECB 默认长度:1024 填充方式: 
	NoPadding
	PKCS1Padding
	OAEPWITHMD5AndMGF1Pading
	OAEPWITHSHA1AndMGF1Pading
	OAEPWITHSHA256AndMGF1Pading
	OAEPWITHSHA384AndMGF1Pading
	OAEPWITHSHA512AndMGF1Pading

	BC 密钥长度:512~65536(64整数倍) 工作模式:NONE 默认长度:2048 填充方式: 
	NoPadding
	PKCS1Padding
	OAEPWITHMD5AndMGF1Pading
	OAEPWITHSHA1AndMGF1Pading
	OAEPWITHSHA224AndMGF1Pading
	OAEPWITHSHA256AndMGF1Pading
	OAEPWITHSHA384AndMGF1Pading
	OAEPWITHSHA512AndMGF1Pading
	ISO9796-1Padding


<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">

	public static void jdkRSA(String msg) {
		try {
			// 1.初始化密钥
			KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
			keyPairGenerator.initialize(512);
			KeyPair keyPair = keyPairGenerator.generateKeyPair();
			RSAPublicKey rsaPublicKey = (RSAPublicKey) keyPair.getPublic();
			RSAPrivateKey rsaPrivateKey = (RSAPrivateKey) keyPair.getPrivate();

			// 2.执行签名
			PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(rsaPrivateKey.getEncoded());
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			PrivateKey privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
			Signature signature = Signature.getInstance("MD5withRSA");
			signature.initSign(privateKey);
			signature.update(msg.getBytes());
			byte[] result = signature.sign();
			System.out.println("jdk rsa sign: " + Hex.encodeHexString(result));

			// 3.验证签名
			X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(rsaPublicKey.getEncoded());
			keyFactory = KeyFactory.getInstance("RSA");
			PublicKey publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
			signature = Signature.getInstance("MD5withRSA");
			signature.initVerify(publicKey);
			signature.update(msg.getBytes());
			boolean bool = signature.verify(result);
			System.out.println("jdk rea verify:" + bool);
		} catch (Exception e) {
		}
	}

	public static void jdkRSA2(String src) {
		try {
			// 1.初始化密钥
			KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
			keyPairGenerator.initialize(512);
			KeyPair keyPair = keyPairGenerator.generateKeyPair();
			RSAPublicKey rsaPublicKey = (RSAPublicKey) keyPair.getPublic();
			RSAPrivateKey rsaPrivateKey = (RSAPrivateKey) keyPair.getPrivate();
			System.out.println("Public Key : " + Base64.encodeBase64String(rsaPublicKey.getEncoded()));
			System.out.println("Private Key : " + Base64.encodeBase64String(rsaPrivateKey.getEncoded()));

			// 2.私钥加密、公钥解密——加密
			PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(rsaPrivateKey.getEncoded());
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			PrivateKey privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
			Cipher cipher = Cipher.getInstance("RSA");
			cipher.init(Cipher.ENCRYPT_MODE, privateKey);
			byte[] result = cipher.doFinal(src.getBytes());
			System.out.println("私钥加密、公钥解密——加密 : " + Base64.encodeBase64String(result));

			// 3.私钥加密、公钥解密——解密
			X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(rsaPublicKey.getEncoded());
			keyFactory = KeyFactory.getInstance("RSA");
			PublicKey publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
			cipher = Cipher.getInstance("RSA");
			cipher.init(Cipher.DECRYPT_MODE, publicKey);
			result = cipher.doFinal(result);
			System.out.println("私钥加密、公钥解密——解密：" + new String(result));

			// 4.公钥加密、私钥解密——加密
			x509EncodedKeySpec = new X509EncodedKeySpec(rsaPublicKey.getEncoded());
			keyFactory = KeyFactory.getInstance("RSA");
			publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
			cipher = Cipher.getInstance("RSA");
			cipher.init(Cipher.ENCRYPT_MODE, publicKey);
			result = cipher.doFinal(src.getBytes());
			System.out.println("公钥加密、私钥解密——加密 : " + Base64.encodeBase64String(result));

			// 5.公钥加密、私钥解密——解密
			pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(rsaPrivateKey.getEncoded());
			keyFactory = KeyFactory.getInstance("RSA");
			privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
			cipher = Cipher.getInstance("RSA");
			cipher.init(Cipher.DECRYPT_MODE, privateKey);
			result = cipher.doFinal(result);
			System.out.println("公钥加密、私钥解密——解密：" + new String(result));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

</pre>


**非对称加密算法 - ElGamal**

	  公钥加密算法
	 实现方:BC 密钥长度:160~16384(8的整数倍) , 默认:1024 工作模式:ECB,NONE
	 填充方式:
	 NoPadding , PKCS1Padding
	 OAEPWITHMD5AndMGF1Pading
	 OAEPWITSHA1AndMGF1Pading
	 OAEPWITSHA224AndMGF1Pading
	 OAEPWITSHA256AndMGF1Pading
	 OAEPWITSHA384AndMGF1Pading
	 OAEPWITSHA512AndMGF1Pading
	 ISO9796-1Padding


<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	public static void bcElGamal(String src) {
		try {
			// 公钥加密,私钥解密
			Security.addProvider(new BouncyCastleProvider());

			// 1.初始化密钥
			AlgorithmParameterGenerator algorithmParameterGenerator = AlgorithmParameterGenerator.getInstance("ElGamal");
			algorithmParameterGenerator.init(256);
			AlgorithmParameters algorithmParameters = algorithmParameterGenerator.generateParameters();

			DHParameterSpec dhParameterSpec =  (DHParameterSpec) algorithmParameters.getParameterSpec(DHParameterSpec.class);
			KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("ElGamal");
			keyPairGenerator.initialize(dhParameterSpec, new SecureRandom());
			KeyPair keyPair = keyPairGenerator.generateKeyPair();
			PublicKey elGamalPublicKey = keyPair.getPublic();
			PrivateKey elGamalPrivateKey = keyPair.getPrivate();

			System.out.println("Public Key:" + org.apache.commons.codec.binary.Base64.encodeBase64String(elGamalPublicKey.getEncoded()));
			System.out.println("Private Key:" + org.apache.commons.codec.binary.Base64.encodeBase64String(elGamalPrivateKey.getEncoded()));

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
</pre>


**数字签名算法 - DSA**

	  DSS (Digital Signature Standard)数字签名标准
	  DSA(Digital Signature Algorithm)数字签名算法
	  DSA仅包含数字签名
	  
	  算法:
	  SHA1withDSA    实现方:JDK
	  SHA224withDSA  实现方:BC
	  SHA256withDSA  实现方:BC
	  SHA384withDSA  实现方:BC
	  SHA512withDSA  实现方:BC


<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	public static void jdkDSA(String src) {
		try {
			// 1.初始化密钥
			KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("DSA");
			keyPairGenerator.initialize(512);
			KeyPair keyPair = keyPairGenerator.generateKeyPair();
			DSAPublicKey dsaPublicKey = (DSAPublicKey) keyPair.getPublic();
			DSAPrivateKey dsaPrivateKey = (DSAPrivateKey) keyPair.getPrivate();

			// 2.执行签名
			PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(dsaPrivateKey.getEncoded());
			KeyFactory keyFactory = KeyFactory.getInstance("DSA");
			PrivateKey privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
			Signature signature = Signature.getInstance("SHA1withDSA");
			signature.initSign(privateKey);
			signature.update(src.getBytes());
			byte[] result = signature.sign();
			System.out.println("jdk dsa sign : " + Hex.encodeHexString(result));

			// 3.验证签名
			X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(dsaPublicKey.getEncoded());
			keyFactory = KeyFactory.getInstance("DSA");
			PublicKey publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
			signature = Signature.getInstance("SHA1withDSA");
			signature.initVerify(publicKey);
			signature.update(src.getBytes());
			boolean bool = signature.verify(result);
			System.out.println("jdk dsa verify : " + bool);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
</pre>


**数字签名算法 - ECDSA**

	 微软
	 Elliptic Curve Digital Signature Algorithm , 椭圆曲线数字签名算法
	 速度快,强度高,签名短.
	 
	 算法:
	 NNONEwithECDSA       实现方:JDK/BC  签名长度:128 
	 RIPEMD160withECDSA   实现方:BC      签名长度:160
	 SHA1withECDSA        实现方:JDK/BC  签名长度:160
	 SHA224withECDSA      实现方:BC      签名长度:224
	 SHA256withECDSA      实现方:JDK/BC  签名长度:256
	 SHA384withECDSA      实现方:JDK/BC  签名长度:384
	 SHA512withECDSA      实现方:JDK/BC  签名长度:512
	 
	jdk版本1.7以上

<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	public static void jdkECDSA(String src) {
		try {
			//1.初始化密钥
			KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("EC");
			keyPairGenerator.initialize(256);
			KeyPair keyPair = keyPairGenerator.generateKeyPair();
			ECPublicKey ecPublicKey = (ECPublicKey)keyPair.getPublic();
			ECPrivateKey ecPrivateKey = (ECPrivateKey)keyPair.getPrivate();
			
			//2.执行签名
			PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(ecPrivateKey.getEncoded());
			KeyFactory keyFactory = KeyFactory.getInstance("EC");
			PrivateKey privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
			Signature signature = Signature.getInstance("SHA1withECDSA");
			signature.initSign(privateKey);
			signature.update(src.getBytes());
			byte[] result = signature.sign();
			System.out.println("jdk ecdsa sign : " + Hex.encodeHexString(result));
			
			//3.验证签名
			X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(ecPublicKey.getEncoded());
			keyFactory = KeyFactory.getInstance("EC");
			PublicKey publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
			signature = Signature.getInstance("SHA1withECDSA");
			signature.initVerify(publicKey);
			signature.update(src.getBytes());
			boolean bool = signature.verify(result);
			System.out.println("jdk ecdsa verify : " + bool);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
</pre>


**IDEA**

	这种算法是在DES算法的基础上发展出来的，类似于三重DES。
	发展IDEA也是因为感到DES具有密钥太短等缺点。IDEA的密钥为128位，这么长的密钥在今后若干年内应该是安全的。

<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	public static void bcIDEA(String src) {
		try {
			Security.addProvider(new BouncyCastleProvider());
			
			//生成key
			KeyGenerator keyGenerator = KeyGenerator.getInstance("IDEA");
			keyGenerator.init(128);
			SecretKey secretKey = keyGenerator.generateKey();
			byte[] keyBytes = secretKey.getEncoded();
			
			//转换密钥
			Key key = new SecretKeySpec(keyBytes, "IDEA");
			
			//加密
			Cipher cipher = Cipher.getInstance("IDEA/ECB/ISO10126Padding");
			cipher.init(Cipher.ENCRYPT_MODE, key);
			byte[] result = cipher.doFinal(src.getBytes());
			System.out.println("bc idea encrypt : " + Base64.encodeBase64String(result));
			
			//解密
			cipher.init(Cipher.DECRYPT_MODE, key);
			result = cipher.doFinal(result);
			System.out.println("bc idea decrypt : " + new String(result));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
</pre>


**CRC**

<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	public static void jdkCrc(String src){
		CRC32 crc = new CRC32();
		crc.update(src.getBytes());
		String hex = Long.toHexString(crc.getValue());
		System.out.println("jdk crc32 : " + hex);
	}
</pre>


**运行**

<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	public static void main(String[] args) {
		
		//AES
		jdkAES("comtu");

		//Base64
		jdkBase64("comtu");
		commonsCodesBase64("comtu");
		bouncyCastleBase64("comtu");

		//DES
		jdkDES("comtu");
		bcDES("comtu");
		jdk3DES("comtu");

		//DH
		jdkDH("comtu");

		//DSA
		jdkDSA("comtu");

		//ECDSA
		jdkECDSA("comtu");

		//ElGamal
		bcElGamal("comtu");
		
		//HMAC
		jdkHmacMD5("comtu", "1234567890abcdef");
		bcHmacMD5("comtu", "1234567890abcdef");

		//IDEA
		bcIDEA("comtu");

		//md
		System.out.println("MD5_TYPE_16:" + Md.md5s("comtu", MD5_TYPE_16));
		System.out.println("MD5_TYPE_32:" + Md.md5s("comtu", MD5_TYPE_32));
		jdkMD2("comtu");
		jdkMD5("comtu");
		bcMD4("comtu");
		bcMD5("comtu");
		ccMD2("comtu");
		ccMD5("comtu");

		//PBE
		jdkPBE("comtu");

		//RSA
		jdkRSA("comtu");
		jdkRSA2("comtu");

	
		//SHA
		jdkSHA1("comtu");
		bcSHA1("comtu");
		bcSHA224("comtu");
		jdkSHA224_2("comtu");
		ccSHA1("comtu");
	}
</pre>

案例引用如下三个jar包:

	bcprov-ext-jdk15on-149.jar
	bcprov-jdk15on-149.jar
	commons-codec-1.10.jar

代码引用包详情见原代码:

[本文Demo源代码](/res/file/blog/2014/12/01/Java_security/Security.rar)

