package kr.or.skb.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.skb.member.servise.MemberServise;
import kr.or.skb.member.vo.Member;

@RestController
@RequestMapping(value = "/member")
public class MemberController {

	@Autowired
	private MemberServise memberServise;
	
	
	@GetMapping(value = "/checkId/{memberId}") // 주소로 넘겨주니까 주소를 맞춰줘야함
	public int checkId(@PathVariable String memberId) {//@PathVariable경로에있는 값가지고올때사용
		Member m = memberServise.selectOneMember(memberId);
		if (m == null) {
			return 0;
		} else {

			return 1;
		}
	}
	@PostMapping(value = "/join")
	public int join(@RequestBody Member member) {//.post("/member/join", member)아걸로 보내면 @RequestBody이거 붙여서 받아야함!
		//System.out.println(member);
		//service호출시 메소드이름이Member로 끝나면 매개변수가 Member타입이면 비번 암호화 수행
		int result = memberServise.insertMember(member);
		return result;
	}
	@PostMapping(value = "/login")
	public String login(@RequestBody Member member) {
		String result=memberServise.login(member);
		return result;
	}
}
