package kr.or.skb;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/taste/**")
		.addResourceLocations("file:///C:/Temp/soolkkerbi/taste/");
		
		registry.addResourceHandler("/product/**")
		.addResourceLocations("file:///C:/Temp/soolkkerbi/product/");
		
		registry.addResourceHandler("/product/editor/**")
		.addResourceLocations("file:///C:/Temp/soolkkerbi/product/editor/");
		
		registry.addResourceHandler("/notice/editor/**")
		.addResourceLocations("file:///C:/Temp/soolkkerbi/notice/editor/");
		
		registry.addResourceHandler("/qna/editor/**")
		.addResourceLocations("file:///C:/Temp/soolkkerbi/qna/editor/");
		
		registry.addResourceHandler("/review/editor/**")
		.addResourceLocations("file:///C:/Temp/soolkkerbi/review/editor/");
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}