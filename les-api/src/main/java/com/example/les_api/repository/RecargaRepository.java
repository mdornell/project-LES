package com.example.les_api.repository;

import com.example.les_api.domain.recarga.Recarga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface RecargaRepository extends JpaRepository<Recarga, Integer> {

    @Query("SELECT COALESCE(SUM(r.valor), 0.0) FROM Recarga r WHERE r.dataRecarga < :limite")
    Double totalRecargasAntes(@Param("limite") Date limite);

    @Query("SELECT FUNCTION('DATE', r.dataRecarga) AS dia, SUM(r.valor) AS total " +
            "FROM Recarga r WHERE r.dataRecarga BETWEEN :inicio AND :fim " +
            "GROUP BY FUNCTION('DATE', r.dataRecarga)")
    List<Object[]> totaisPorDia(@Param("inicio") Date inicio, @Param("fim") Date fim);

}
