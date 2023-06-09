from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.postgres_operator import PostgresOperator

default_args = {
    'owner': 'hoo',
    'depends_on_past': False,
    'start_date': datetime(2023, 6, 5),
    'email': ['sksk8922@gmail.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG('exercise_statistics', default_args=default_args, schedule_interval='@weekly')

sql_query = '''
INSERT INTO exercise_statistics (user_id, exercise_type, total_sets, total_weight_lifted)
SELECT user_id, exercise_type, COUNT(*) AS total_sets, SUM(CAST(SPLIT_PART(exercise_record, ':', 2) AS INTEGER)) AS total_weight_lifted
FROM exercise_records
WHERE date >= '{{ execution_date - macros.timedelta(weeks=1) }}' AND date < '{{ execution_date }}'
GROUP BY user_id, exercise_type
'''

generate_statistics = PostgresOperator(
    task_id='generate_statistics',
    postgres_conn_id='your_postgres_connection',
    sql=sql_query,
    dag=dag
)

generate_statistics
