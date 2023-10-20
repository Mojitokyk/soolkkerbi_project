package kr.or.skb.member.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.skb.JwtUtil;
import kr.or.skb.PageInfo;
import kr.or.skb.Pagination;
import kr.or.skb.member.model.dao.MemberDao;
import kr.or.skb.member.model.vo.Member;


@Service
public class MemberService {
	
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	private JwtUtil jwtUtil;
	@Value("${jwt.secret}")
	private String secretKey;
	private long expiredMs;
	@Autowired
	private Pagination pagination;
	
	public MemberService() {
		super();
		expiredMs = 1000 * 60 * 60 * 24 * 8;
	}

	public Member selectOneMember(String memberId) {
		return memberDao.selectOneMember(memberId);
	}

	@Transactional
	public int insertMember(Member member) {
		System.out.println(member);
		int result = memberDao.insertMember(member);
		System.out.println("dao -> service");
		return result;
	}

	public String login(Member member) {
		Member m = memberDao.selectOneMember(member.getMemberId());
		if (m != null && bCryptPasswordEncoder.matches(member.getMemberPw(), m.getMemberPw())) {
			String token = jwtUtil.createToken(member.getMemberId(), secretKey, expiredMs);
			System.out.println(jwtUtil.isExpired(token, secretKey));
			return token;
		} else {
			return "실패";
		}

	}

	public Map readAllMember(int reqPage) {
		int totalCount = memberDao.totalCount();
		int numPerPage = 10;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List memberList = memberDao.selectAllMember(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", memberList);
		map.put("pi", pi);
		return map;
	}

	public Member selectMemberId(Member member) {
		System.out.println(member);
		return memberDao.selectMemberId(member);
	}

	public Member selectMemberPw(Member member) {
		return memberDao.selectMemberPw(member);
	}

	public int changePhone(Member member) {
		
		return memberDao.changePhone(member);
	}
	public int pwCheck(Member member) {
		Member m = memberDao.selectOneMember(member.getMemberId());
		if (m != null && bCryptPasswordEncoder.matches(member.getMemberPw(), m.getMemberPw())) {
			return 1;
		}
		return 0;
	}
	@Transactional
	public int changePwMember(Member member) {
		// TODO Auto-generated method stub
		return memberDao.changePw(member);
	}
	@Transactional
	public int deleteMember(String memberId) {
		// TODO Auto-generated method stub
		return memberDao.deleteMember(memberId);
	}

	public int thumbnail(Member m) {
		// TODO Auto-generated method stub
		return memberDao.thumbnail(m);
	}

}
