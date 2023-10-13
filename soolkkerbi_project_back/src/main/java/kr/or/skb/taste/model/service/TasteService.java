package kr.or.skb.taste.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.skb.PageInfo;
import kr.or.skb.Pagination;
import kr.or.skb.member.model.dao.MemberDao;
import kr.or.skb.member.model.vo.Member;

import kr.or.skb.reservation.model.vo.Reservation;

import kr.or.skb.taste.model.dao.TasteDao;
import kr.or.skb.taste.model.vo.Taste;

@Service
public class TasteService {

	@Autowired
	private TasteDao tasteDao;
	@Autowired
	private Pagination pagination;
	@Autowired private MemberDao memberDao;
	
	public Map partyList(int reqPage) {
		// 게시물조회 ,페이징에 필요한 데이터를 취합
		int numPerPage = 12; //한페이지당 게시물수
		int pageNaviSize = 5; //페이지 네비게이션 길이
		int totalCount = tasteDao.totalCount();
		//페이징 조회 및페이지 제작에 필요한 데이터를 객체롤 받아옴
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
				List tasteList = tasteDao.selectPartyList(pi);
	    HashMap<String, Object> map = new HashMap<String, Object>();
	    map.put("tasteList", tasteList);
	    map.put("pi",pi);
	    return map;
		
	}
	
	//시음회 게시글 상세보기
	public Taste selectOneTaste(int tasteNo) {
		return tasteDao.selectOneTaste(tasteNo);
	}


	public int insertTaste(Taste t) {
		Member member = memberDao.selectOneMember(t.getMemderId());
		t.setTasteMemberNo(member.getMemberNo());
		int result = tasteDao.insertTaste(t);
		return result;
	}
	//시음회 예약 등록
	public int insertReservation(Reservation r) {
		//1. 회원번호를 가져옴
		Member m = memberDao.selectOneMember(r.getReservationMemberId());
		System.out.println("tasteService - memberNo: "+m.getMemberNo());
		r.setReservationMemberNo(m.getMemberNo());
		System.out.println("tasteService - reservationMemberNo: "+r.getReservationMemberNo());
		//2. 회원번호를 사용하여 insert 
		return tasteDao.insertReservation(r);

	}
	
}
