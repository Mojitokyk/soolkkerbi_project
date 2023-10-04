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
	
	
}
