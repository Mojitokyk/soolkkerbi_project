package kr.or.skb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class JwtConfig {

	@Value("${jwt.secret}")
	private String secretKey;
	@Autowired
	private JwtUtil jwtUtil;
	//filter에조건걸기
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		return http
				.httpBasic().disable()          //HTTP기본인증(사용자이름/비번인증을 사용하지 않겠다)
				.csrf().disable().cors()        //csrf 공격을 비활성화  /cors두개포트사용시 설정
				.and()
				.authorizeRequests()            //요청에대한 권한 설정
				//post요청중에 /member/login /member/join은 그냥 허용해줘
				.antMatchers(HttpMethod.POST,"/member/login","/member/join","/member/findId","/member/findPw","/member/auth").permitAll() 
				//post요청중에 /member/로시작하면 반드시 인증을 하도록 설정
				.antMatchers(HttpMethod.POST,"/member/**","/board/insert","/board/contentImg").authenticated()
				.and()
				.sessionManagement()           //세션관련 설정
				//세션을 상태없는 상태로 운영-> JWT로 인증하는 경우 사용하는 설정
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS) 
				.and()
				//필터를 통해서 인증 승인을 처리
				.addFilterBefore(new JwtFilter(secretKey,jwtUtil),UsernamePasswordAuthenticationFilter.class)
				.build();
	}
}
