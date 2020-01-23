select
    district_name as districts,
    sum(
        case
            when group_id = 1 then 1
            else 0
        end
    ) as prerna,
    sum(
        case
            when group_id = 2 then 1
            else 0
        end
    ) as sadhana,
    sum(
        case
            when group_id = 3 then 1
            else 0
        end
    ) as class_appropriate
from
(
        select
            s_d.student_id,
            group_id,
            district_name
        from
            (
                select
                    ncll.student_id,
                    cd.district_name
                from
                    um_student us
                    inner join nu_current_learning_level ncll on us.student_id = ncll.student_id
                    inner join config_district cd on cd.district_id = us.district_id
                order by
                    district_name
            ) as s_d
            inner join (
                select
                    ncll.student_id,
                    group_id
                from
                    nu_group_section_level ngsl
                    inner join nu_current_learning_level ncll on ncll.reading_status_id = ngsl.id
                order by
                    group_id
            ) as s_g on s_d.student_id = s_g.student_id
        order by
            district_name
    ) as main
group by
    district_name