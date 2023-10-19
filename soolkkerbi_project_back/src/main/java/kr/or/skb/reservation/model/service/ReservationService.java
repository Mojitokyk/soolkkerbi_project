package kr.or.skb.reservation.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.skb.PageInfo;
import kr.or.skb.Pagination;
import kr.or.skb.reservation.model.dao.ReservationDao;
import kr.or.skb.reservation.model.vo.Reservation;
import kr.or.skb.reservation.model.vo.ReservationData;

@Service
public class ReservationService {
	@Autowired
	private ReservationDao reservationDao;
	@Autowired
	private Pagination pagination;

	public Map readAllCancelReservation(int reqPage) {
		int totalCount = reservationDao.totalCount();
		int numPerPage = 10;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List reservationList = reservationDao.selectAllReservation(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list",reservationList);
		map.put("pi",pi);
		return map;
	}

	@Transactional
	public int updateReservationStatus(Reservation reservation) {
		return reservationDao.updateReservationStatus(reservation);
	}

	public Map myReservationList(int reqPage, String memberId) {
		int totalCount = reservationDao.totalCount();
		int numPerPage = 10;
		int pageNaviSize = 5;
		PageInfo pi = pagination .getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int start =pi.getStart();
		int end = pi.getEnd();
		ReservationData rld = new ReservationData(memberId,start,end);
			List myReservationList = reservationDao.myReservationList(rld);
			//System.out.println("memberId :"+memberId);
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("myReservationList" , myReservationList);
			map.put("pi",pi);
			return map;
		
	}

	@Transactional
	public int changeDate(Reservation reservation) {
		// TODO Auto-generated method stub
		return reservationDao.changeDate(reservation);
	}

	@Transactional
	public int delete(int reservationNo) {
		// TODO Auto-generated method stub
		return reservationDao.delete(reservationNo);
	}

	//시음회 중복 예약 방지 메서드
	public List myReservationList2(int memberNo) {
		return reservationDao.myReservationList2(memberNo);
	}
	
	
	
	
}
