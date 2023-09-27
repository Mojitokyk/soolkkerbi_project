package kr.or.skb;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import kr.or.skb.member.model.vo.Member;


@Aspect
@Component
public class PasswordEncAdvice {
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Pointcut(value = "execution (int kr.or.skb.member.model.service.MemberService.*Member(kr.or.skb.member.model.vo.Member))")
     public void pwEncPointcut() {}
	
	@Before(value = "pwEncPointcut()")
	public void pwEncAdvice(JoinPoint jp) {
		Member m = (Member)jp.getArgs()[0];
		String encPw = bCryptPasswordEncoder.encode(m.getMemberPw());
		m.setMemberPw(encPw);
	}
}
