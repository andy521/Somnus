package com.somnus.action;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.octo.captcha.service.image.ImageCaptchaService;

/**  
 * @Description: TODO
 * @author Somnus
 * @date 2015年11月21日 下午12:06:31 
 * @version 1.0 
 */
@Namespace("/")
@Action
public class CaptchaAction extends BaseAction {
    
    protected transient Logger log = LoggerFactory.getLogger(this.getClass());
    
    @Autowired
    private ImageCaptchaService captchaService;
    
	/**
	 * 验证码处理
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void doNotNeedSessionAndSecurity_handleCaptcha() throws Exception {
		
		byte[] captchaChallengeAsJpeg = null;
		
		ByteArrayOutputStream jpegOutputStream = new ByteArrayOutputStream();
		
		String captchaId = getSession().getId();
		log.debug("captcha id: {}", new Object[]{captchaId});

		BufferedImage challenge = captchaService.getImageChallengeForID(captchaId, getRequest().getLocale());
		
		ImageIO.write(challenge, "jpg", jpegOutputStream);
		
		captchaChallengeAsJpeg = jpegOutputStream.toByteArray();
		
		ServletOutputStream out = getResponse().getOutputStream();
		out.write(captchaChallengeAsJpeg);
		out.flush();
		out.close();
	}

}
