package kr.or.skb.member.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.skb.EmailSender;
import kr.or.skb.FileUtil;
import kr.or.skb.member.model.service.MemberService;
import kr.or.skb.member.model.vo.Member;
import kr.or.skb.taste.model.vo.Taste;

@RestController
@RequestMapping(value = "/member")
public class MemberController {

	@Autowired
	private MemberService memberService;
	@Autowired
	private EmailSender emailSender;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	
	@GetMapping(value = "/checkId/{memberId}") 
	public int checkId(@PathVariable String memberId) {
		Member m = memberService.selectOneMember(memberId);
		if (m == null) {
			return 0;
		} else {
			return 1;
		}
	}
	@GetMapping(value = "/checkEmail/{memberEmail}")
	public int checkEmail(@PathVariable String memberEmail) {
		System.out.println(memberEmail);
		Member m = memberService.selectOneMemberEmail(memberEmail);
		
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
		System.out.println("sevice에서 controller로 옴");
		return result;
	}
	@PostMapping(value = "/login")
	public String login(@RequestBody Member member) {
		String result=memberService.login(member);
		System.out.println(result);
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
	@PostMapping(value = "/memberPwChange")
	public int memberPwChange(@RequestBody Member member) {
		//member.setMemberId(memberId); 
		return memberService.changePwMember(member);
	}
	
	@PostMapping(value = "/auth")
	public String authMail(@RequestBody Member member) {
		System.out.println(member.getMemberEmail());
		String authCode = emailSender.authMail(member.getMemberEmail());
		System.out.println(authCode);
		return authCode;
	}
	
	@PostMapping(value = "/thumbnail")
	public int thumbnail(@ModelAttribute Member m,@ModelAttribute MultipartFile thumbnail ) {
		String savepath = root + "member/";
//		String savepath = root+""
//				+ "member/";
//		if(m.getMemberFilepath().equals("null")) {
//			m.setMemberFilepath(null);
//		}
//		
		System.out.println(thumbnail);
		 if (thumbnail != null) {
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, thumbnail);
			m.setMemberFilepath(filepath);
		}
		System.out.println(m);
		int result =memberService.thumbnail(m);
		return result;
	}
	
	@PostMapping(value = "/thumbnailReset")
	public int thumbnailReset(@RequestAttribute String memberId) {
		return memberService.thumbnailReset(memberId);
	}

}
