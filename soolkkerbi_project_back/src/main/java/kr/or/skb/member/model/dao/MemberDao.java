package kr.or.skb.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.member.model.vo.Member;


@Mapper
public interface MemberDao {
	
	Member selectOneMember(String memberId);

	int insertMember(Member member);


}
