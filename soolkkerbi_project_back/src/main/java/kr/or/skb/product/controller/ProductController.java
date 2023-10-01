package kr.or.skb.product.controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.skb.FileUtil;
import kr.or.skb.product.model.service.ProductService;
import kr.or.skb.product.model.vo.Product;

@RestController
@RequestMapping(value="/product")
public class ProductController {
	@Autowired
	private ProductService productService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	//상품 등록
	@PostMapping(value="/insert")
	public int insertBoard(@ModelAttribute Product p, 
							@ModelAttribute MultipartFile thumbnail) {
		String savepath = root+"product/";
		if(thumbnail != null) {
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, thumbnail);
			p.setProductFilepath(filepath);
		}
		int result = productService.insertProduct(p);
		return result;
	}
	
	@PostMapping(value="/contentImg")
	public String contentImg(@ModelAttribute MultipartFile image) {
		String savepath = root+"product/editor/";
		String filename = image.getOriginalFilename();
		String filepath = fileUtil.getFilepath(savepath, filename, image);
		return "/prduct/editor/"+filepath;
	}
	
	@GetMapping(value = "/readAllProduct/{reqPage}")
	public Map readAllProduct(@PathVariable int reqPage) {
		return productService.readAllProduct(reqPage);
	}

	@PostMapping(value = "/updateStock")
	public int updateStock(@RequestBody Product p) {
		return productService.updateStock(p);
	}
}
