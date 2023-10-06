package kr.or.skb.member.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;
import kr.or.skb.member.model.vo.Member;


@Mapper
public interface MemberDao {
	
	Member selectOneMember(String memberId);

	int insertMember(Member member);

	int totalCount();

	List selectAllMember(PageInfo pi);

	Member selectMemberId(Member member);

	Member selectMemberPw(Member member);

	int changePhone(Member member);

	int changePw(Member member);
	


}
