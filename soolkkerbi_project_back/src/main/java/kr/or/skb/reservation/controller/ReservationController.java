package kr.or.skb.reservation.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
}
