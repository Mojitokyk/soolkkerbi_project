package kr.or.skb.reservation.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.skb.reservation.model.service.ReservationService;
import kr.or.skb.reservation.model.vo.Reservation;
import kr.or.skb.taste.model.vo.Taste;

@RestController
@RequestMapping(value="/reservation")
public class ReservationController {
	@Autowired
	private ReservationService reservationService;
	
	@GetMapping(value="/readAllCancelReservation/{reqPage}")
	public Map readAllCancelReservation(@PathVariable int reqPage) {
		return reservationService.readAllCancelReservation(reqPage);
	}
	
	@PostMapping(value="/updateReservationStatus")
	public int updateReservationStatus(@RequestBody Reservation reservation) {
		return reservationService.updateReservationStatus(reservation);
	}
	@GetMapping(value = "/myReservationList/{reqPage}")
	public Map myReservationList(@PathVariable int reqPage,@RequestAttribute String memberId ) {
		//System.out.println("memberId :"+memberId);
		return reservationService.myReservationList(reqPage,memberId);
	}
	@PostMapping(value = "/changeDate")
	public int changeDate(@RequestBody Reservation reservation) {
		return reservationService.changeDate(reservation);
	}
	@GetMapping(value = "/delete/{reservationNo}")
	public int delete(@PathVariable int reservationNo) {
		return reservationService.delete(reservationNo);
	}
	
	//시음회 중복 예약 방지 메서드
	@GetMapping(value="/getReservationStatus/{memberNo}/{tasteNo}")
	public int getReservationStatus(@PathVariable int memberNo, @PathVariable int tasteNo) {
		List myReservationList = reservationService.myReservationList2(memberNo);
//		System.out.println(myReservationList);
		
		for(int i=0;i < myReservationList.size();i++) {
			Reservation r = (Reservation)myReservationList.get(i); //다운캐스팅 필요 myReservation.get(i).getReservationTasteNo()는 불가
//			System.out.println(r.getReservationTasteNo());
			if(tasteNo == r.getReservationTasteNo() && r.getReservationStatus() == 1) //조회된 예약내역과 현제페이지의 시음회가 일치하고, 예약완료 상태이면 1반환 
			{
				return 1;
			}
		}
		return 0;
	}
}
