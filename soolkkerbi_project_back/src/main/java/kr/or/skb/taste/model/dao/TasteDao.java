package kr.or.skb.taste.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;
import kr.or.skb.reservation.model.vo.Reservation;
import kr.or.skb.taste.model.vo.Taste;

@Mapper
public interface TasteDao {

	int totalCount();

	List selectPartyList(PageInfo pi);

	//시음회 게시글 상세보기
	Taste selectOneTaste(int tasteNo);


	int insertTaste(Taste t);

	//시음회 예약 등록
	int insertReservation(Reservation r);

	

}
