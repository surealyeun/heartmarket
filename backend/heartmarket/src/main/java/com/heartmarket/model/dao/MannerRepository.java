package com.heartmarket.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.heartmarket.model.dto.Manner;

@Repository
public interface MannerRepository extends JpaRepository<Manner, Integer> {

	Manner findBymUserUserNo(int userNo);

}
