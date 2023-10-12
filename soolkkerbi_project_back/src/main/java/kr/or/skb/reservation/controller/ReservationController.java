package kr.or.skb.reservation.controller;

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
		System.out.println("memberId :"+memberId);
		return reservationService.myReservationList(reqPage,memberId);
	}
	@PostMapping(value = "/changeDate")
	public int changeDate(@RequestBody Reservation reservation) {
		return reservationService.changeDate(reservation);
	}
}
