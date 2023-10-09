package kr.or.skb.member.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.or.skb.member.model.service.MemberService;
import kr.or.skb.member.model.vo.Member;

@RestController
@RequestMapping(value = "/member")
public class MemberController {

	@Autowired
	private MemberService memberService;
	
	
	@GetMapping(value = "/checkId/{memberId}") 
	public int checkId(@PathVariable String memberId) {
		Member m = memberService.selectOneMember(memberId);
		if (m == null) {
			return 0;
		} else {
			return 1;
		}
	}
	@PostMapping(value = "/join")
	public int join(@RequestBody Member member) {
		System.out.println(member);
		int result = memberService.insertMember(member);
		return result;
	}
	@PostMapping(value = "/login")
	public String login(@RequestBody Member member) {
		String result=memberService.login(member);
		return result;
	}

	@PostMapping(value = "/findId")
	public String findId(@RequestBody Member member) {
		System.out.println(member);
		Member m = memberService.selectMemberId(member);
		if (m != null) {
			System.out.println(member);
			return m.getMemberId();
		}
		return null;
	}
	@PostMapping(value = "/findPw")
	public String findPw(@RequestBody Member member) {
		System.out.println(member);
		Member m = memberService.selectMemberPw(member);
		if (m != null) {
			System.out.println(member);
			return m.getMemberId();
		}
		return null;
	}
	
	@GetMapping(value="/readAllMember/{reqPage}")
	public Map readAllMember(@PathVariable int reqPage) {
		return memberService.readAllMember(reqPage);
	}
	
	@PostMapping(value="/getMember")
	public Member mypage(@RequestAttribute String memberId) {
		return memberService.selectOneMember(memberId);
	}
	@PostMapping(value = "/changePhone")
	public int changePhone(@RequestBody Member member) {
		return memberService.changePhone(member);
	}
	@PostMapping(value = "pwCheck")
	public int pwCheck(@RequestBody Member member, @RequestAttribute String memberId) {
		member.setMemberId(memberId);
		return memberService.pwCheck(member);
	}
	@PostMapping(value = "/changePw")
	public int changePw(@RequestBody Member member,@RequestAttribute String memberId) {
		member.setMemberId(memberId); 
		return memberService.changePwMember(member);
	}
	@PostMapping(value = "/deleteMember")
	public int deleteMember(@RequestAttribute String memberId) {
		return memberService.deleteMember(memberId);
	}
}
