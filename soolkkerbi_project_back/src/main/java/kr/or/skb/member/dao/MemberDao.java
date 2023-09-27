package kr.or.skb.member.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.member.vo.Member;


@Mapper
public interface MemberDao {
	
	Member selectOneMember(String memberId);

	int insertMember(Member member);


}
