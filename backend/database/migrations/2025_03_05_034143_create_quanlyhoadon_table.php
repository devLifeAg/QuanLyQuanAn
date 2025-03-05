<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quanlyhoadon', function (Blueprint $table) {
            $table->tinyInteger("hd_id",true,true);
            $table->dateTime("hd_ngaygio");
            $table->double("hd_tongtien");
            $table->integer("hd_pttt");
            $table->tinyInteger('b_id')->unsigned();
            $table->tinyInteger("u_id")->unsigned();
            $table->tinyInteger("kc_id")->unsigned();
            $table->foreign('b_id')->references('b_id')->on('ban')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('u_id')->references('u_id')->on('user')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('kc_id')->references('kc_id')->on('quanlyketca')->onUpdate('cascade')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quanlyhoadon');
        Schema::table('quanlyhoadon', function (Blueprint $table) {
            $table->dropForeign(['quanlyhoadon_b_id_foreign, quanlyhoadon_u_id_foreign,quanlyhoadon_kc_id_foreign']);
            $table->dropIndex(['quanlyhoadon_b_id_foreign,quanlyhoadon_u_id_foreign,quanlyhoadon_kc_id_foreign']);
        });

    }
};
